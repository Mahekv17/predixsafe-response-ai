
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/components/ui/use-toast';

const Footer: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Received",
      description: "Thank you for reaching out! Our team will contact you shortly.",
    });
  };
  
  return (
    <footer id="contact" className="relative bg-emergency-dark pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Get in Touch</h2>
            <p className="text-white/80 mb-6">
              Have questions about PredixSafe or want to see how it can transform your emergency response?
              Our team of experts is ready to help.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emergency-purple/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Phone</h3>
                  <p className="text-white/70">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emergency-purple/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-white/70">info@predixsafe.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emergency-purple/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Address</h3>
                  <p className="text-white/70">123 Innovation Way<br />Silicon Valley, CA 94025</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="bg-emergency-dark/50 border border-emergency-purple/30">
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-4 px-3 py-1 border-emergency-purple text-emergency-purple">
                  Contact Us
                </Badge>
                <h3 className="text-2xl font-bold mb-4 text-white">Send a Message</h3>
                
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-white/80">Name</label>
                      <Input id="name" placeholder="Your Name" className="bg-emergency-dark/70 border-emergency-purple/30" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-white/80">Email</label>
                      <Input id="email" type="email" placeholder="your@email.com" className="bg-emergency-dark/70 border-emergency-purple/30" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="organization" className="text-sm text-white/80">Organization</label>
                    <Input id="organization" placeholder="Your Organization" className="bg-emergency-dark/70 border-emergency-purple/30" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-white/80">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help..."
                      rows={4}
                      className="bg-emergency-dark/70 border-emergency-purple/30"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-emergency-purple hover:bg-emergency-purple/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <hr className="border-emergency-purple/20 my-10" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">PredixSafe</h4>
            <p className="text-white/70 mb-4">
              AI-powered emergency response optimization for faster response times and better resource allocation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-8 w-8 rounded-full bg-emergency-purple/20 flex items-center justify-center hover:bg-emergency-purple/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-emergency-purple/20 flex items-center justify-center hover:bg-emergency-purple/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-emergency-purple/20 flex items-center justify-center hover:bg-emergency-purple/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                  <rect width="20" height="20" x="2" y="2" rx="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 hover:text-emergency-purple transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 hover:text-emergency-purple transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 hover:text-emergency-purple transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 hover:text-emergency-purple transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 hover:text-emergency-purple transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  Support Center
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  Data Processing
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-emergency-purple transition-colors">
                  HIPAA Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} PredixSafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
