const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('FadeInSection')) {
  content = content.replace(
    "import SectionSeparator from './components/SectionSeparator';",
    "import SectionSeparator from './components/SectionSeparator';\nimport FadeInSection from './components/FadeInSection';"
  );
  
  const oldMain = `<main>
        <Hero />
        <SectionSeparator />
        <About />
        <SectionSeparator />
        <Skills />
        <SectionSeparator />
        <Experience />
        <SectionSeparator />
        <Certifications />
        <SectionSeparator />
        <Portfolio />
        <SectionSeparator />
        <ActivitySection />
        <SectionSeparator />
        <Testimonials />
        <SectionSeparator />
        <Contact />
      </main>`;
      
  const newMain = `<main>
        <Hero />
        <SectionSeparator />
        <FadeInSection><About /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Skills /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Experience /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Certifications /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Portfolio /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><ActivitySection /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Testimonials /></FadeInSection>
        <SectionSeparator />
        <FadeInSection><Contact /></FadeInSection>
      </main>`;
      
  content = content.replace(oldMain, newMain);
  fs.writeFileSync('src/App.tsx', content, 'utf8');
}
