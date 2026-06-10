import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">EduScope</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering students to find their ideal academic home through data-driven discovery.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/colleges" className="text-sm text-muted-foreground hover:text-primary">Colleges</Link></li>
              <li><Link href="/compare" className="text-sm text-muted-foreground hover:text-primary">Compare</Link></li>
              <li><Link href="/scholarships" className="text-sm text-muted-foreground hover:text-primary">Scholarships</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-muted-foreground">Twitter</li>
              <li className="text-sm text-muted-foreground">LinkedIn</li>
              <li className="text-sm text-muted-foreground">Instagram</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduScope Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
