# Webbshop - Beauty of Joseon

## Description
Webshop -- Beauty of Joseon is an e-commerce application where users can explore and "purchase" beauty products inspired by traditional Korean skincare. The application is built using modern web development technology for a smooth and responsive user experience.

## Technologies
The project is built with the following technologies:
- **React** - To create a dynamic and interactive frontend
- **Next.js** - For server-side rendering and better performance
- **TypeScript** - For type-safe development
- **MUI (Material-UI)** - For sleek and responsive UI components
- **Prisma** - For database management

## Installation and Running

Follow these steps to install and run the project locally:

1. Clone this repository:
   ```sh
   git clone https://github.com/plugga-tech/nextjs-webshop-ts-react-skincare-webshop.git
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables by creating a .env file and filling in the relevant variables for Prisma and other services.


4. Migrate the database:
   ```sh
   npx prisma migrate dev
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```
.
## Link to Design System
We use **MUI (Material-UI)** as the design system. The documentation can be found here:
[Material-UI Documentation](https://mui.com/)

# Kravspecifikation för projektet

[x]Alla sidor ska vara responsiva
→ Applikationen är byggd med MUI och mobilanpassade komponenter för full responsivitet.
[x] Arbetet ska implementeras med Next.js
→ Projektet är byggt med Next.js som ramverk.
[x] Backenden ska ha validering på samtliga endpoints (även Server Actions)
→ Zod används för validering på både API-endpoints och Server Actions.
[x] Skapa ett ER-diagram som ska ha visats vid idégodkännandet
→ ER-diagram presenterades vid idégodkännandet och speglar datamodellen i Prisma.
[x] Beskriv företagsidén i en kort textuell presentation
→ En kort affärsidé presenterades i samband med idégodkännandet.
[x] All data ska vara sparad i en SQL-databas (förutom bilder)
→ Produkter, ordrar, användare och kategorier lagras i en PostgreSQL-databas via Prisma.
[x] Man ska kunna logga in som administratör
→ Inloggning med rollbaserad åtkomst (admin/kund) är implementerad.
[x] Inga lösenord får sparas i klartext i databasen
→ Via Better-Auth inloggning
[x] Besökare ska kunna beställa produkter, vilket uppdaterar lagersaldo
→ Beställningar uppdaterar automatiskt produktens lagersaldo i databasen.
[x] Administratörer ska kunna uppdatera lagersaldo via adminsidan
→ Adminpanelen innehåller funktionalitet för att uppdatera lagersaldo per produkt.
[x] Administratörer ska kunna se en lista på alla gjorda beställningar
→ Beställningsöversikt är tillgänglig i adminvyn.
[x] Produkter ska delas in i kategorier (minst en per produkt, flera möjliga)
→ Produkter har relationer till en eller flera kategorier i databasen.
[x] Man ska kunna lista alla produkter och filtrera per kategori
→ Kategorifiltrering är implementerad på produktsidan.
[x] Besökare ska kunna lägga produkter i en kundkorg (sparas i localStorage)
→ Kundkorgen hanteras med localStorage och uppdateras i realtid.
[x] Besökare ska kunna registrera sig och logga in för att kunna göra en beställning
→ Användare måste vara inloggade för att kunna slutföra en order.
[x] Checkoutflödet ska ha validering på alla fält
→ Samtliga fält i checkout-formuläret valideras innan order kan skickas.
[x] Inloggade kunder ska kunna se sina tidigare beställningar och deras status
→ En kundvyn visar historik och orderstatus ("skickad" eller ej).
[x]Administratörer ska kunna redigera produkter
→ Produkter kan redigeras direkt från adminpanelen.
[x] Administratörer ska kunna lägga till och ta bort produkter
→ Adminpanelen innehåller stöd för att skapa och ta bort produkter.
[x] Administratörer ska kunna markera beställningar som skickade
→ Beställningsstatus kan ändras manuellt av admin till "skickad".