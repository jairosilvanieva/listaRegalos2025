export interface Gift {
    id: string;
    name: string;
    description: string;
    isSelected: boolean;
    eventId: string;
    permalink?: string;
    selectedBy?: {
      nombre: string;
      apellido: string;
      dni: string;
    };
  }
  