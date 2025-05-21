export type AppUser = {
    id: number;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null;
    isAdmin: boolean;
  };
  