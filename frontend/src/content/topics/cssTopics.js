// CSS Topics Content
export const cssTopics = {
  boxModel: {
    id: 10,
    category: 'css',
    difficulty: 'basic',
    question: 'What is the CSS Box Model?',
    title: 'CSS Box Model',
    subtitle: 'Understanding element sizing and spacing',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'The CSS Box Model describes how every HTML element is represented as a rectangular box with content, padding, border, and margin. Understanding the box model is crucial for controlling layout and spacing.',
          hinglish: 'CSS Box Model batata hai ki har HTML element ek rectangular box ki tarah hota hai jismein content, padding, border aur margin hota hai.',
          keyPoints: [
            'Content - The actual content (text, images)',
            'Padding - Space between content and border',
            'Border - Line around padding',
            'Margin - Space outside border'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Box Model Visualization',
        examples: [
          {
            title: 'Box Model Structure',
            code: `/* Visual representation */
.box {
  /*Margin (outside) - transparent */
  /*Border - visible line */
  /*Padding (inside) - transparent */  
  /*Content - actual content */
  
  width: 200px;      /* Content width */
  height: 100px;     /* Content height */
  padding: 20px;     /* Space inside border */
  border: 5px solid black; /* Border line */
  margin: 30px;      /* Space outside border */
}

/* Total width = 200 + 20*2 + 5*2 + 30*2 = 310px */
/* Total height = 100 + 20*2 + 5*2 + 30*2 = 210px */`,
            explanation: 'Default box-sizing adds padding and border to width/height'
          },
          {
            title: 'Box-Sizing Property',
            code: `/* Content-box (default) */
.content-box {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200 + 40 + 10 = 250px */
}

/* Border-box (recommended) */
.border-box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200px (includes padding + border) */
  /* Content width = 200 - 40 - 10 = 150px */
}

/* Apply to all elements */
* {
  box-sizing: border-box;
}`,
            explanation: 'border-box makes sizing more predictable'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Practical Examples',
        examples: [
          {
            title: 'Card Component',
            code: `<div class="card">
  <h2>Card Title</h2>
  <p>Card content goes here...</p>
</div>

<style>
.card {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;          /* Space inside */
  border: 2px solid #ddd; /* Border */
  margin: 20px;           /* Space outside */
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>`,
            explanation: 'Card with proper spacing using box model'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain each box model component (content, padding, border, margin)',
          'Discuss box-sizing: content-box vs border-box',
          'Know how to calculate total element size',
          'Explain margin collapsing behavior',
          'Discuss negative margins use cases'
        ]
      }
    ]
  },

  flexbox: {
    id: 11,
    category: 'css',
    difficulty: 'intermediate',
    question: 'What is Flexbox and how does it work?',
    title: 'CSS Flexbox',
    subtitle: 'One-dimensional layout system',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'Flexbox (Flexible Box Layout) is a CSS layout mode designed for distributing space and aligning items in a container, even when their size is unknown or dynamic. It works in one dimension (row or column).',
          hinglish: 'Flexbox ek CSS layout system hai jo container mein items ko distribute aur align karne ke liye use hota hai. Ye row ya column mein kaam karta hai.',
          keyPoints: [
            'One-dimensional layout (row or column)',
            'Container and item properties',
            'Flexible sizing and alignment',
            'Great for responsive layouts'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Basic Flexbox',
        examples: [
          {
            title: 'Flex Container Setup',
            code: `.container {
  display: flex;
  /* or display: inline-flex; */
  
  /* Direction */
  flex-direction: row; /* row | row-reverse | column | column-reverse */
  
  /* Wrapping */
  flex-wrap: nowrap; /* nowrap | wrap | wrap-reverse */
  
  /* Justify content (main axis) */
  justify-content: flex-start; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
  
  /* Align items (cross axis) */
  align-items: stretch; /* stretch | flex-start | flex-end | center | baseline */
  
  /* Gap between items */
  gap: 16px;
}`,
            explanation: 'Container properties control layout'
          },
          {
            title: 'Flex Items',
            code: `.item {
  /* Grow factor */
  flex-grow: 1; /* Default: 0 */
  
  /* Shrink factor */
  flex-shrink: 1; /* Default: 1 */
  
  /* Base size */
  flex-basis: auto; /* Default: auto */
  
  /* Shorthand */
  flex: 1; /* flex-grow flex-shrink flex-basis */
  
  /* Individual alignment */
  align-self: center; /* Override container align-items */
}`,
            explanation: 'Item properties control individual sizing'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Real World Examples',
        examples: [
          {
            title: 'Navigation Bar',
            code: `<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="nav-links">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
</nav>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
</style>`,
            explanation: 'Horizontal navigation with flexbox'
          },
          {
            title: 'Card Grid',
            code: `<div class="card-container">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px; /* grow shrink basis */
  padding: 2rem;
  background: white;
  border-radius: 8px;
}
</style>`,
            explanation: 'Responsive card layout'
          },
          {
            title: 'Centered Content',
            code: `.center-container {
  display: flex;
  justify-content: center; /* Horizontal center */
  align-items: center;     /* Vertical center */
  min-height: 100vh;
}

.content {
  padding: 2rem;
  background: white;
  border-radius: 8px;
}`,
            explanation: 'Perfect centering with flexbox'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain flex-direction and main/cross axis',
          'Discuss justify-content vs align-items',
          'Know flex-grow, flex-shrink, flex-basis',
          'Explain when to use flexbox vs grid',
          'Discuss common flexbox patterns (navbar, cards)'
        ]
      }
    ]
  },

  grid: {
    id: 12,
    category: 'css',
    difficulty: 'advanced',
    question: 'What is CSS Grid and how is it different from Flexbox?',
    title: 'CSS Grid',
    subtitle: 'Two-dimensional layout system',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns simultaneously. Unlike Flexbox (1D), Grid works in both dimensions at once.',
          hinglish: 'CSS Grid ek 2D layout system hai jo rows aur columns dono mein ek saath complex layouts banane deta hai. Flexbox se different hai jo sirf 1 direction mein kaam karta hai.',
          keyPoints: [
            'Two-dimensional (rows AND columns)',
            'Great for page layouts',
            'Grid lines and areas',
            'More powerful than flexbox for complex layouts'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Grid Basics',
        examples: [
          {
            title: 'Grid Container',
            code: `.container {
  display: grid;
  
  /* Define columns */
  grid-template-columns: 200px 1fr 200px; /* 3 columns */
  /* or */
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  
  /* Define rows */
  grid-template-rows: 100px auto 50px; /* 3 rows */
  
  /* Gap between cells */
  gap: 20px; /* or row-gap + column-gap */
}`,
            explanation: 'Basic grid setup with columns and rows'
          },
          {
            title: 'Grid Items',
            code: `.item {
  /* Span columns */
  grid-column: 1 / 3; /* From line 1 to line 3 */
  /* or */
  grid-column: span 2; /* Span 2 columns */
  
  /* Span rows */
  grid-row: 1 / 4; /* From line 1 to line 4 */
  
  /* Place in specific cell */
  grid-area: 2 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}`,
            explanation: 'Control item placement'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Real World Layouts',
        examples: [
          {
            title: 'Dashboard Layout',
            code: `<div class="dashboard">
  <header>Header</header>
  <nav>Sidebar</nav>
  <main>Main Content</main>
  <aside>Widgets</aside>
  <footer>Footer</footer>
</div>

<style>
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: 80px 1fr 60px;
  gap: 20px;
  min-height: 100vh;
}

header {
  grid-column: 1 / 4; /* Span all columns */
}

nav {
  grid-row: 2; /* Second row */
}

main {
  grid-row: 2;
  grid-column: 2;
}

aside {
  grid-row: 2;
  grid-column: 3;
}

footer {
  grid-column: 1 / 4; /* Span all columns */
}
</style>`,
            explanation: 'Complex dashboard layout with grid'
          },
          {
            title: 'Responsive Gallery',
            code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.gallery-item:nth-child(3n+1) {
  grid-column: span 2; /* Some items span 2 columns */
}`,
            explanation: 'Auto-responsive image gallery'
          },
          {
            title: 'Grid Template Areas',
            code: `.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 80px 1fr 60px;
  gap: 20px;
}

header { grid-area: header; }
nav    { grid-area: nav; }
main   { grid-area: main; }
aside  { grid-area: aside; }
footer { grid-area: footer; }`,
            explanation: 'Named grid areas for cleaner code'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Grid vs Flexbox',
        examples: [
          {
            title: 'When to Use Grid',
            code: `/* Grid: 2D layouts, page structure */
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
}`,
            note: 'Use Grid for: Page layouts, complex 2D structures, overlapping items'
          },
          {
            title: 'When to Use Flexbox',
            code: `/* Flexbox: 1D layouts, components */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
            note: 'Use Flexbox for: Navigation bars, button groups, single-direction layouts'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain Grid vs Flexbox differences (2D vs 1D)',
          'Discuss grid-template-columns/rows syntax',
          'Know fr unit and auto-fit/auto-fill',
          'Explain grid-template-areas for complex layouts',
          'Discuss when to use Grid vs Flexbox',
          'Know implicit vs explicit grid'
        ]
      }
    ]
  },

  selectors: {
    id: 59,
    category: 'css',
    difficulty: 'basic',
    question: 'What are CSS selectors and their types?',
    title: 'CSS Selectors',
    subtitle: 'Targeting HTML elements with precision',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'CSS selectors are patterns used to select and style HTML elements. They range from simple element selectors to complex combinators and pseudo-classes.',
          hinglish: 'CSS selectors patterns hain jo HTML elements ko select aur style karne ke liye use hote hain.',
          keyPoints: [
            'Element, class, and ID selectors',
            'Attribute selectors',
            'Pseudo-classes and pseudo-elements',
            'Combinators'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Basic Selectors',
        examples: [
          {
            title: 'Type, Class, and ID',
            code: `/* Element selector */
p {
  color: black;
}

/* Class selector */
.button {
  padding: 10px 20px;
}

/* ID selector */
#header {
  background: #333;
}

/* Multiple classes */
.button.primary {
  background: blue;
}`,
            explanation: 'Most common selectors'
          },
          {
            title: 'Attribute Selectors',
            code: `/* Exact match */
input[type="text"] {
  border: 1px solid #ccc;
}

/* Contains */
a[href*="google"] {
  color: blue;
}

/* Starts with */
a[href^="https"] {
  color: green;
}

/* Ends with */
img[src$=".png"] {
  border: 2px solid red;
}`,
            explanation: 'Select by attributes'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Pseudo-classes',
        examples: [
          {
            title: 'Interactive States',
            code: `/* Hover */
button:hover {
  background: darkblue;
}

/* Focus */
input:focus {
  outline: 2px solid blue;
}

/* Active */
button:active {
  transform: scale(0.98);
}

/* Visited links */
a:visited {
  color: purple;
}`,
            explanation: 'Style based on element state'
          },
          {
            title: 'Structural Pseudo-classes',
            code: `/* First/Last child */
li:first-child { font-weight: bold; }
li:last-child { margin-bottom: 0; }

/* Nth child */
tr:nth-child(even) { background: #f0f0f0; }
tr:nth-child(odd) { background: white; }

/* Not selector */
input:not([type="submit"]) {
  border: 1px solid #ccc;
}`,
            explanation: 'Select by position'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Combinators',
        examples: [
          {
            title: 'Descendant and Child',
            code: `/* Descendant (any level) */
div p {
  color: blue;
}

/* Direct child only */
div > p {
  color: red;
}

/* Adjacent sibling */
h2 + p {
  margin-top: 0;
}

/* General sibling */
h2 ~ p {
  color: gray;
}`,
            explanation: 'Combine selectors for precise targeting'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'List main selector types: element, class, ID, attribute',
          'Explain pseudo-classes vs pseudo-elements',
          'Discuss selector specificity',
          'Know common combinators: descendant, child, sibling',
          'Explain :nth-child() syntax'
        ]
      }
    ]
  },

  positioning: {
    id: 60,
    category: 'css',
    difficulty: 'intermediate',
    question: 'What is CSS positioning and its values?',
    title: 'CSS Positioning',
    subtitle: 'Controlling element placement',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'CSS position property specifies how an element is positioned in the document. The five position values are: static, relative, absolute, fixed, and sticky.',
          hinglish: 'CSS position property element ko document mein kaise position karna hai ye specify karta hai. 5 values hain: static, relative, absolute, fixed, sticky.',
          keyPoints: [
            'static - default, normal document flow',
            'relative - positioned relative to itself',
            'absolute - positioned relative to nearest positioned ancestor',
            'fixed - positioned relative to viewport',
            'sticky - hybrid of relative and fixed'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Position Values',
        examples: [
          {
            title: 'Static (Default)',
            code: `.element {
  position: static; /* Default */
  /* top, right, bottom, left have no effect */
}`,
            note: 'Normal document flow'
          },
          {
            title: 'Relative',
            code: `.element {
  position: relative;
  top: 20px;    /* Move 20px down from original position */
  left: 30px;   /* Move 30px right from original position */
}
/* Space still reserved in original position */`,
            note: 'Positioned relative to itself'
          },
          {
            title: 'Absolute',
            code: `.parent {
  position: relative; /* Positioning context */
}

.child {
  position: absolute;
  top: 0;
  right: 0;
  /* Positioned relative to parent */
  /* Removed from document flow */
}`,
            note: 'Positioned relative to nearest positioned ancestor'
          },
          {
            title: 'Fixed',
            code: `.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* Stays fixed during scroll */
}`,
            note: 'Positioned relative to viewport'
          },
          {
            title: 'Sticky',
            code: `.header {
  position: sticky;
  top: 0; /* Sticks when scrolled to top */
}`,
            note: 'Toggles between relative and fixed'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Real World Examples',
        examples: [
          {
            title: 'Modal Overlay',
            code: `.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 8px;
}`,
            explanation: 'Fixed overlay with centered modal'
          },
          {
            title: 'Sticky Navigation',
            code: `.nav {
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;
}`,
            explanation: 'Navigation that sticks to top when scrolling'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain each position value clearly',
          'Discuss positioning context for absolute',
          'Know z-index and stacking context',
          'Explain when to use each position type',
          'Discuss accessibility concerns with fixed/sticky'
        ]
      }
    ]
  },

  animations: {
    id: 61,
    category: 'css',
    difficulty: 'advanced',
    question: 'What are CSS animations and transitions?',
    title: 'CSS Animations & Transitions',
    subtitle: 'Creating smooth animations with CSS',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'CSS Transitions provide smooth changes between property values over time. CSS Animations allow more complex, multi-step animations using keyframes.',
          hinglish: 'CSS Transitions property values mein smooth changes karte hain. CSS Animations keyframes use karke complex multi-step animations banate hain.',
          keyPoints: [
            'Transitions - simple A to B animations',
            'Animations - complex multi-step with keyframes',
            'Both hardware-accelerated',
            'Transform and opacity are most performant'
          ]
        }
      },
      {
        type: 'examples',
        title: 'CSS Transitions',
        examples: [
          {
            title: 'Basic Transition',
            code: `.button {
  background: blue;
  transition: background 0.3s ease;
}

.button:hover {
  background: darkblue;
}

/* Transition multiple properties */
.box {
  transition: all 0.3s ease-in-out;
  /* or specific */
  transition: width 0.3s, height 0.3s, background 0.5s;
}`,
            explanation: 'Smooth property changes on state change'
          },
          {
            title: 'Transition Properties',
            code: `.element {
  transition-property: transform, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0.1s;
  
  /* Shorthand */
  transition: transform 0.3s ease-in-out 0.1s;
}`,
            explanation: 'Full transition syntax'
          }
        ]
      },
      {
        type: 'examples',
        title: 'CSS Animations',
        examples: [
          {
            title: 'Keyframe Animation',
            code: `@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 0.5s ease-out;
}`,
            explanation: 'Slide in animation with keyframes'
          },
          {
            title: 'Complex Animation',
            code: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.ball {
  animation: bounce 1s infinite;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}`,
            explanation: 'Bouncing animation with custom easing'
          },
          {
            title: 'Multiple Animations',
            code: `.element {
  animation: 
    fadeIn 0.5s ease-out,
    slideUp 0.5s ease-out,
    pulse 2s infinite;
}`,
            explanation: 'Run multiple animations simultaneously'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Performance Tips',
        examples: [
          {
            title: 'Hardware-Accelerated Properties',
            code: `/* ✅ Good - GPU accelerated */
.element {
  transform: translate3d(0, 0, 0);
  opacity: 0.5;
}

/* ❌ Avoid - causes reflow/repaint */
.element {
  width: 100px;
  height: 100px;
  margin-left: 20px;
}`,
            explanation: 'Use transform and opacity for smooth 60fps animations'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain transition vs animation differences',
          'Discuss animation-fill-mode values',
          'Know timing functions (ease, linear, cubic-bezier)',
          'Explain hardware acceleration',
          'Discuss performance best practices',
          'Know will-change property for optimization'
        ]
      }
    ]
  }
};
