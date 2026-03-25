import {
  Component, OnInit, OnDestroy,
  ElementRef, ViewChild, AfterViewInit, inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl:    './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection') heroRef!: ElementRef<HTMLElement>;

  cart = inject(CartService);

  private animFrameId = 0;
  private THREE: any;
  private renderer: any;
  private scene: any;
  private camera: any;
  private meshGroup: any;
  private particles: any;

  stats = [
    { value: '50+',  label: 'Menu Items'     },
    { value: '4.9★', label: 'Rating'         },
    { value: '30min',label: 'Avg Delivery'   },
    { value: '2K+',  label: 'Happy Customers'},
  ];

  async ngAfterViewInit() {
    await this.initThree();
  }

  private async initThree() {
    this.THREE = await import('three');
    const T = this.THREE;
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.offsetWidth  || window.innerWidth;
    const h = canvas.offsetHeight || window.innerHeight;

    // Renderer
    this.renderer = new T.WebGLRenderer({
      canvas, alpha: true, antialias: true
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;

    // Scene & Camera
    this.scene  = new T.Scene();
    this.camera = new T.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.set(0, 0, 6);

    // Lights
    const ambLight = new T.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambLight);

    const redLight = new T.PointLight(0xc0392b, 3, 15);
    redLight.position.set(3, 3, 3);
    this.scene.add(redLight);

    const goldLight = new T.PointLight(0xf5a623, 2, 12);
    goldLight.position.set(-3, -2, 2);
    this.scene.add(goldLight);

    const topLight = new T.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 5, 5);
    topLight.castShadow = true;
    this.scene.add(topLight);

    // ── Pizza Base (flat cylinder = pizza)
    this.meshGroup = new T.Group();

    const crustGeo = new T.CylinderGeometry(1.8, 1.9, 0.18, 64);
    const crustMat = new T.MeshStandardMaterial({
      color: 0xc8860a, roughness: 0.9, metalness: 0.05
    });
    const crust = new T.Mesh(crustGeo, crustMat);
    crust.castShadow = true;
    this.meshGroup.add(crust);

    // Sauce layer
    const sauceGeo = new T.CylinderGeometry(1.55, 1.55, 0.06, 64);
    const sauceMat = new T.MeshStandardMaterial({
      color: 0xb22222, roughness: 0.8, metalness: 0.0
    });
    const sauce = new T.Mesh(sauceGeo, sauceMat);
    sauce.position.y = 0.1;
    this.meshGroup.add(sauce);

    // Cheese layer
    const cheeseGeo = new T.CylinderGeometry(1.45, 1.45, 0.05, 64);
    const cheeseMat = new T.MeshStandardMaterial({
      color: 0xf5c842, roughness: 0.7, metalness: 0.0
    });
    const cheese = new T.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = 0.14;
    this.meshGroup.add(cheese);

    // Toppings (small spheres)
    const toppingPositions = [
      [0.5,  0.3], [-0.6, 0.7], [0.8, -0.5],
      [-0.3, -0.8],[ 0.1,  0.9],[-0.9, 0.1],
      [0.7,  0.6], [-0.5,-0.4], [0.3, -0.6],
      [-0.8, 0.6], [ 0.6, -0.2],[-0.2, 0.5]
    ];
    const toppingColors = [0xe74c3c, 0x27ae60, 0xf39c12, 0x8e44ad];

    toppingPositions.forEach(([x, z], i) => {
      const geo = new T.SphereGeometry(0.1 + Math.random() * 0.08, 8, 8);
      const mat = new T.MeshStandardMaterial({
        color: toppingColors[i % toppingColors.length],
        roughness: 0.6
      });
      const topping = new T.Mesh(geo, mat);
      topping.position.set(x!, 0.22, z!);
      this.meshGroup.add(topping);
    });

    // Tilt pizza for 3D look
    this.meshGroup.rotation.x = -0.4;
    this.meshGroup.position.set(0.5, 0, 0);
    this.scene.add(this.meshGroup);

    // ── Floating Rings ──────────────────────────────────
    const ringColors = [0xc0392b, 0xf5a623, 0xffffff];
    ringColors.forEach((color, i) => {
      const rGeo = new T.TorusGeometry(2.8 + i * 0.5, 0.015, 8, 100);
      const rMat = new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.15 + i * 0.05 });
      const ring = new T.Mesh(rGeo, rMat);
      ring.rotation.x = -0.4 + i * 0.15;
      ring.userData['speed'] = 0.002 + i * 0.001;
      this.scene.add(ring);
    });

    // ── Particle Field ───────────────────────────────────
    const pCount = 180;
    const pGeo   = new T.BufferGeometry();
    const pPos   = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    pGeo.setAttribute('position', new T.BufferAttribute(pPos, 3));
    const pMat = new T.PointsMaterial({
      color: 0xf5a623, size: 0.05, transparent: true, opacity: 0.6
    });
    this.particles = new T.Points(pGeo, pMat);
    this.scene.add(this.particles);

    // Mouse parallax
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('resize',    this.onResize.bind(this));

    this.animate();
  }

  private mouseX = 0;
  private mouseY = 0;

  private onMouseMove(e: MouseEvent) {
    this.mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  private onResize() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || !this.camera || !this.renderer) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private animate() {
    this.animFrameId = requestAnimationFrame(() => this.animate());
    const t = Date.now() * 0.001;

    if (this.meshGroup) {
      this.meshGroup.rotation.y     = t * 0.3;
      this.meshGroup.rotation.x     = -0.4 + Math.sin(t * 0.5) * 0.05;
      this.meshGroup.position.y     = Math.sin(t * 0.8) * 0.15;

      // Parallax
      this.meshGroup.rotation.z = this.mouseX * 0.05;
      this.camera.position.x    = this.mouseX * 0.3;
      this.camera.position.y    = -this.mouseY * 0.2;
    }

    if (this.particles) {
      this.particles.rotation.y = t * 0.04;
      this.particles.rotation.x = t * 0.02;
    }

    this.scene?.children.forEach((obj: any) => {
      if (obj.geometry?.type === 'TorusGeometry') {
        obj.rotation.z += obj.userData['speed'] ?? 0.002;
      }
    });

    this.renderer?.render(this.scene, this.camera);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('resize',    this.onResize.bind(this));
    this.renderer?.dispose();
  }
}