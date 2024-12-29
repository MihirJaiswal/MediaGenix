'use client';
import React from 'react';
import Hero from './Hero';
import CTASection from './Cta';
import BentoAbout from './Aboutus';

export default function HomePage() {
  return (
    <div className=" text-white">
      <section className="mx-auto">
       <Hero/>
      </section>
      <section>
        <BentoAbout/>
      </section>
      <section className="py-16 px-6">
        <CTASection/>
      </section>    
    </div>
  );
}
