# Guía de Buenas Prácticas para el Desarrollo (React + Vite)

Esta guía proporciona un conjunto de buenas prácticas y convenciones recomendadas para el desarrollo de este proyecto con React y Vite.

## 1. Estructura del Proyecto

Mantener una estructura de proyecto clara y organizada es crucial para la mantenibilidad.

```
/public
  vite.svg
  ... (otros assets públicos)
/src
  /assets
    react.svg
    ... (imágenes, fuentes, etc. específicas de la app)
  /components
    Button.jsx
    ProductCard.jsx
    Navbar.jsx
    ... (componentes reutilizables)
  /hooks
    useAuth.js
    useFetch.js
    ... (custom hooks)
  /services
    api.js
    authService.js
    ... (lógica de interacción con APIs)
  /contexts
    AuthContext.js
    ... (React Context para estado global)
  /pages (si se usa React Router)
    HomePage.jsx
    AboutPage.jsx
    ... (componentes que representan páginas completas)
  /styles o /css
    _variables.css
    global.css
    main.css
    ... (archivos CSS globales o por módulos)
  App.jsx
  main.jsx
  index.css (o App.css para estilos principales de App)
  ... (otros archivos de configuración o principales)
... (archivos de configuración: vite.config.js, package.json, etc.)
```

*   **`src/components`**: Para componentes de UI reutilizables.
*   **`src/hooks`**: Para custom hooks que encapsulan lógica reutilizable.
*   **`src/services`**: Para módulos que manejan la comunicación con APIs externas.
*   **`src/contexts`**: Si se necesita gestión de estado global con Context API.
*   **`src/assets`**: Para imágenes, fuentes y otros archivos estáticos que son importados por los módulos de la aplicación.
*   **`public`**: Para archivos estáticos que se sirven directamente desde la raíz (ej. `favicon.ico`, `robots.txt`).

## 2. Diseño de Componentes

*   **Reusabilidad y Single Responsibility Principle (SRP)**: Crea componentes pequeños y enfocados en una única tarea. Esto los hace más fáciles de entender, probar y reutilizar.
*   **Props**: Usa props para pasar datos y funciones a los componentes hijos. Define `propTypes` (con la librería `prop-types`) o usa TypeScript para validar los tipos de las props y mejorar la robustez.
*   **Nomenclatura**:
    *   Componentes: `PascalCase` (ej. `UserProfile.jsx`).
    *   Funciones y variables: `camelCase` (ej. `fetchUserData`).
*   **Estado y Lógica**: Mantén la lógica de estado lo más local posible. Eleva el estado solo cuando sea necesario compartirlo entre múltiples componentes.

## 3. Gestión del Estado

*   **`useState`**: Para el estado local simple dentro de los componentes funcionales.
*   **`useReducer`**: Para lógica de estado más compleja o cuando el próximo estado depende del anterior.
*   **Context API**: Para estado global que necesita ser accesible por muchos componentes en diferentes niveles del árbol sin pasar props manualmente (prop drilling). Úsalo con moderación, ya que puede complicar el seguimiento del flujo de datos si se abusa.
*   **Librerías de Estado (Opcional para este proyecto)**: Para aplicaciones más grandes, considera librerías como Redux, Zustand o Recoil. Para este proyecto, `useState`, `useReducer` y Context API deberían ser suficientes.

## 4. Interacción con APIs

*   **Centralización**: Crea un módulo o servicio (ej. `src/services/api.js`) para centralizar todas las llamadas a la API. Esto facilita la gestión de endpoints, cabeceras, y manejo de errores.
*   **Manejo de Carga y Errores**: Siempre implementa estados de carga (`loading`) y maneja los errores (`error`) de las peticiones de forma clara para el usuario.
*   **Tokens y URLs**:
    *   No hardcodear URLs de API o tokens directamente en los componentes.
    *   Utiliza variables de entorno (`.env` files soportados por Vite) para almacenar esta información sensible o configurable. Ejemplo: `VITE_API_URL`, `VITE_API_TOKEN`.
    *   Accede a ellas en tu código con `import.meta.env.VITE_API_URL`.
    *   **Importante**: Los tokens de escritura o sensibles nunca deben exponerse en el lado del cliente si otorgan demasiado acceso. Idealmente, las operaciones sensibles se manejan a través de un backend propio.

## 5. Estilos (Styling)

*   **Consistencia**: Elige un enfoque y sé consistente.
    *   **CSS Plano**: Organiza tu CSS en archivos separados (globales, por componente). Usa convenciones como BEM para evitar colisiones de nombres.
    *   **CSS Modules**: Permiten escribir CSS local por componente, evitando colisiones. `[name].module.css`.
    *   **Styled-components / Emotion**: CSS-in-JS, donde los estilos se escriben dentro de los archivos JavaScript/TypeScript.
    *   **Tailwind CSS**: Framework CSS de utilidad primero, muy popular para prototipado rápido y sistemas de diseño.
*   **Evita el exceso de estilos en línea**: Son difíciles de mantener y sobrescribir. Úsalos para estilos dinámicos cuando sea estrictamente necesario.

## 6. Calidad del Código

*   **ESLint y Prettier**: Configura y usa un linter (ESLint, ya presente) para identificar problemas de código y un formateador (Prettier) para mantener un estilo de código consistente.
*   **Comentarios**: Escribe comentarios claros y concisos para explicar lógica compleja o decisiones de diseño no obvias. No comentes lo obvio.
*   **Código Limpio**: Sigue principios de código limpio (nombres descriptivos, funciones cortas, evita duplicación - DRY).

## 7. Rendimiento

*   **Memoización**: Usa `React.memo` para componentes funcionales y `useMemo` / `useCallback` para memorizar valores y funciones, evitando re-renders innecesarios. Úsalos con criterio, ya que la memoización también tiene un costo.
*   **Optimización de Imágenes**: Comprime y sirve imágenes en formatos modernos (ej. WebP) y tamaños adecuados (Requirement 7).
*   **Code Splitting**: Vite maneja esto automáticamente a nivel de ruta si usas `React.lazy` y `Suspense` para componentes de página.
*   **Listas Virtualizadas**: Para listas muy largas, considera usar librerías como `react-window` o `react-virtualized`.

## 8. Accesibilidad (a11y)

*   **HTML Semántico**: Usa etiquetas HTML apropiadas para su propósito (ej. `<nav>`, `<button>`, `<article>`).
*   **Navegación por Teclado**: Asegúrate de que todos los elementos interactivos sean accesibles y operables mediante el teclado.
*   **ARIA (Accessible Rich Internet Applications)**: Usa atributos ARIA cuando sea necesario para mejorar la accesibilidad de componentes dinámicos o personalizados.
*   **Contraste de Color**: Verifica que haya suficiente contraste entre el texto y el fondo.

## 9. Testing

*   **Pruebas Unitarias**: Para componentes individuales y funciones de utilidad (ej. con Jest y React Testing Library).
*   **Pruebas de Integración**: Para verificar la interacción entre varios componentes.
*   **Pruebas E2E (End-to-End)**: Para simular flujos de usuario completos (ej. con Cypress o Playwright).

## 10. Versionamiento (Git) - Requirement 5

*   **Commits Atómicos y Descriptivos**: Haz commits pequeños y frecuentes. Escribe mensajes de commit claros que expliquen *qué* cambió y *por qué*.
*   **Ramas (Branches)**: Usa ramas para nuevas funcionalidades (`feature/nombre-feature`), correcciones (`fix/nombre-bug`), etc.
*   **Pull Requests / Merge Requests**: Si trabajas en equipo, usa PRs/MRs para revisar el código antes de integrarlo a la rama principal.
*   **`.gitignore`**: Asegúrate de que archivos generados (ej. `node_modules`, `dist`, `.env.local`) estén en tu `.gitignore`.

Esta guía es un punto de partida. Adáptala y expándela según las necesidades específicas de "Tejelanas Vivi".
