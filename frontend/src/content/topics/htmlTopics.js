// HTML Topics Content
export const htmlTopics = {
  semantic: {
    id: 8,
    category: 'html',
    difficulty: 'basic',
    question: 'What is semantic HTML and why is it important?',
    title: 'Semantic HTML',
    subtitle: 'Writing meaningful and accessible HTML',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'Semantic HTML uses HTML tags that clearly describe their meaning and content. Instead of using generic div and span tags, semantic HTML uses tags like header, nav, article, section, footer that describe the purpose of the content.',
          hinglish: 'Semantic HTML meaningful tags use karta hai jo content ka purpose clearly describe karte hain. Generic div/span ki jagah header, nav, article jaise descriptive tags use karte hain.',
          keyPoints: [
            'Makes HTML more readable and maintainable',
            'Improves SEO (Search Engine Optimization)',
            'Better accessibility for screen readers',
            'Easier to understand code structure'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Semantic vs Non-Semantic',
        examples: [
          {
            title: 'Non-Semantic HTML',
            code: `<div id="header">
  <div id="nav">
    <div class="link">Home</div>
    <div class="link">About</div>
  </div>
</div>
<div id="content">
  <div class="post">
    <div class="title">Blog Post</div>
    <div class="text">Content here...</div>
  </div>
</div>
<div id="footer">
  <div>© 2024</div>
</div>`,
            note: 'Uses generic divs - no meaning'
          },
          {
            title: 'Semantic HTML',
            code: `<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>
    <h1>Blog Post</h1>
    <p>Content here...</p>
  </article>
</main>
<footer>
  <p>© 2024</p>
</footer>`,
            note: 'Clear, meaningful structure'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Common Semantic Tags',
        examples: [
          {
            title: 'Document Structure',
            code: `<header>     <!-- Page/section header -->
<nav>        <!-- Navigation links -->
<main>       <!-- Main content -->
<article>    <!-- Independent content -->
<section>    <!-- Thematic grouping -->
<aside>      <!-- Related/sidebar content -->
<footer>     <!-- Page/section footer -->`,
            explanation: 'Main structural elements'
          },
          {
            title: 'Text Content',
            code: `<figure>     <!-- Image with caption -->
  <img src="image.jpg" alt="Description">
  <figcaption>Image caption</figcaption>
</figure>

<time datetime="2024-01-01">January 1, 2024</time>
<mark>Highlighted text</mark>
<abbr title="HyperText Markup Language">HTML</abbr>`,
            explanation: 'Content-specific semantic tags'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain benefits: SEO, accessibility, maintainability',
          'Give examples of semantic vs non-semantic markup',
          'Discuss how screen readers use semantic HTML',
          'Mention impact on search engine rankings',
          'Know when to use article vs section',
          'Understand header/footer can be used multiple times'
        ]
      }
    ]
  },

  html5: {
    id: 9,
    category: 'html',
    difficulty: 'intermediate',
    question: 'What are HTML5 new features and APIs?',
    title: 'HTML5 New Features & APIs',
    subtitle: 'Modern HTML capabilities and APIs',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'HTML5 introduced new semantic elements, form inputs, multimedia support, and powerful JavaScript APIs for building modern web applications without plugins.',
          hinglish: 'HTML5 ne nayi semantic elements, form inputs, multimedia support aur powerful JavaScript APIs di hai jo modern web apps banane mein help karti hain.',
          keyPoints: [
            'New semantic elements (header, footer, article, etc.)',
            'Native audio and video support',
            'Canvas and SVG for graphics',
            'New form input types and validation',
            'Local storage and session storage',
            'Geolocation, Web Workers, WebSockets APIs'
          ]
        }
      },
      {
        type: 'examples',
        title: 'New Form Input Types',
        examples: [
          {
            title: 'HTML5 Input Types',
            code: `<!-- Email with built-in validation -->
<input type="email" required>

<!-- URL validation -->
<input type="url" placeholder="https://example.com">

<!-- Number with min/max -->
<input type="number" min="1" max="100" step="1">

<!-- Date picker -->
<input type="date" min="2024-01-01">

<!-- Color picker -->
<input type="color" value="#ff0000">

<!-- Range slider -->
<input type="range" min="0" max="100" value="50">

<!-- Search with clear button -->
<input type="search" placeholder="Search...">

<!-- Phone number -->
<input type="tel" pattern="[0-9]{10}">`,
            explanation: 'Built-in validation and better UX'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Multimedia Support',
        examples: [
          {
            title: 'Audio & Video',
            code: `<!-- Video with controls -->
<video width="640" height="360" controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  Your browser does not support video.
</video>

<!-- Audio player -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  Your browser does not support audio.
</audio>`,
            explanation: 'Native multimedia without Flash'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Canvas API',
        examples: [
          {
            title: 'Drawing with Canvas',
            code: `<canvas id="myCanvas" width="400" height="400"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw rectangle
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);

// Draw circle
ctx.beginPath();
ctx.arc(200, 200, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();

// Draw text
ctx.font = '30px Arial';
ctx.fillText('Hello Canvas!', 50, 300);
</script>`,
            explanation: 'Graphics and animations with JavaScript'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Local Storage API',
        examples: [
          {
            title: 'Storing Data Locally',
            code: `// Save data
localStorage.setItem('username', 'John');
localStorage.setItem('theme', 'dark');

// Save object
const user = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(user));

// Retrieve data
const username = localStorage.getItem('username');
const userObj = JSON.parse(localStorage.getItem('user'));

// Remove item
localStorage.removeItem('theme');

// Clear all
localStorage.clear();

// Session Storage (cleared on tab close)
sessionStorage.setItem('tempData', 'value');`,
            explanation: 'Client-side data persistence'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Geolocation API',
        examples: [
          {
            title: 'Get User Location',
            code: `if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(\`Location: \${lat}, \${lon}\`);
    },
    (error) => {
      console.error('Error getting location:', error);
    }
  );
} else {
  console.log('Geolocation not supported');
}`,
            explanation: 'Access user location with permission'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'List key HTML5 features: semantic tags, multimedia, APIs',
          'Explain localStorage vs sessionStorage vs cookies',
          'Discuss Canvas vs SVG for graphics',
          'Know new form input types and their validation',
          'Explain Web Workers for background tasks',
          'Discuss browser compatibility and fallbacks'
        ]
      }
    ]
  }
};
