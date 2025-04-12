# rnstyles

`rnstyles` is a lightweight, utility-first, responsive styling library for **React Native**, **React**, **Next.js**, **Expo**, and **Electron**. It mimics the functionality of **Tailwind CSS** and allows you to use utility classes for styling, including full class names, shorthand (Tailwind-style), responsive styles, custom fonts, and dark/light modes.

---

## Features

- Utility-first styling similar to **Tailwind CSS**.
- Support for responsive styles across different screen sizes.
- Custom fonts support.
- Dark and light mode support.
- Compatible with **React Native**, **React**, **Next.js**, **Expo**, and **Electron**.

---

## Installation

To install `rnstyles`, you can use **npm** or **yarn**.

### Using npm:

```bash
npm install rnstyles
```

#### Usage:

import { applyStyles } from 'rnstyles';

or

import { tw } from 'rnstyles';

in react/next

const MyComponent = () => {
return (

<div className={applyStyles('bg-blue-500 text-white p-4 rounded-md')}>
Hello, World!
</div>
);
};

with responsive design:

const MyComponent = () => {
return (

<div className={applyStyles('sm:bg-red-500 md:bg-green-500 lg:bg-blue-500')}>
Responsive Styled Component
</div>
);
};
