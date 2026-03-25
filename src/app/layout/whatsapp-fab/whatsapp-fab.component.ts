import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <button class="wa-fab" (click)="wa.openDirectChat()"
      title="Chat with us on WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148
          -.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15
          -1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018
          -.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099
          -.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5
          -.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297
          -1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096
          3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118
          .571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124
          -.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.849L0 24
          l6.335-1.508A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0
          12 0zm0 21.818a9.808 9.808 0 0 1-5.001-1.371l-.36-.214-3.732.888.939
          -3.618-.235-.373A9.79 9.79 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12
          2.182c5.421 0 9.818 4.398 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
      </svg>
      <span class="wa-fab__pulse"></span>
      <span class="wa-fab__label">Chat with us</span>
    </button>
  `,
  styles: [`
    @use '../../../styles/variables' as *;

    .wa-fab {
      position: fixed;
      bottom: 32px;
      left: 32px;
      z-index: 999;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #25D366, #128C7E);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 24px rgba(37,211,102,0.45);
      transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
      overflow: visible;

      &:hover {
        transform: scale(1.12);
        box-shadow: 0 10px 32px rgba(37,211,102,0.6);

        .wa-fab__label { opacity: 1; transform: translateX(0); }
      }
    }

    .wa-fab__pulse {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid rgba(37,211,102,0.5);
      animation: pulse-ring 2.5s ease-out infinite;
    }

    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: 0.8; }
      100% { transform: scale(1.5); opacity: 0;   }
    }

    .wa-fab__label {
      position: absolute;
      left: calc(100% + 12px);
      white-space: nowrap;
      background: #1a1a1a;
      color: #f0f0f0;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 20px;
      border: 1px solid #2a2a2a;
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.3s ease;
      pointer-events: none;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }
  `]
})
export class WhatsappFabComponent {
  wa = inject(WhatsappService);
}