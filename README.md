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

# ✅ Kravspecifikation för projektet

- [x] Alla sidor skall vara responsiva. (G)
- [x] Arbetet ska implementeras med NextJS. (G)
- [x] Backenden ska ha validering på samtliga endpoints (även Server Actions). (G)
- [x] Skapa ett ER-diagram som ska ha visats vid idégodkännandet. (G)
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska ha visats vid idégodkännandet. (G)
- [x] All data som programmet utnyttjar ska vara sparat i en SQL-databas (produkter, beställningar, konton, mm), med undantaget av bilder. (G)
- [x] Man ska kunna logga in som administratör i systemet. (G)
- [x] Inga lösenord får sparas i klartext i databasen. (G)
- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen. (G)
- [x] Administratörer ska kunna uppdatera antalet produkter i lager från admin-delen av sidan. (G)
- [x] Administratörer ska kunna se en lista på alla gjorda beställningar. (G)
- [x] Sidans produkter ska delas upp i kategorier. En produkt ska tillhöra minst en kategori, men kan tillhöra flera. (G)
- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara de produkter som tillhör en kategori. (G)
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i localStorage på klienten. (G)
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas. (G)
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält. (G)
- [x] När man är inloggad som kund ska man kunna se sina gjorda beställningar och om de är skickade eller inte. (G)
- [x] Administratörer ska kunna redigera produkt. (G)
- [x] Administratörer ska kunna lägga till och ta bort produkter. (G)
- [x] Administratörer ska kunna markera beställningar som skickade. (G)
