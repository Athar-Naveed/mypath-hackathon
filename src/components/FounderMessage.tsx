import Image from "next/image";
import { Quote } from "lucide-react";

export default function FounderMessage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-xl mb-2 tracking-tighter sm:text-3xl md:text-5xl">
            Message from Our Founder
          </h2>
          <div className="relative mt-8 max-w-3xl mx-auto">
            <Quote strokeWidth={0.5} className="absolute -top-4 -left-4 h-8 w-8 text-logo-primary rotate-180 fill-logo-primary" />
            <p className="md:text-4xl text-2xl text-muted-foreground italic px-2">
              Some quote said by the great Noor ul Hassan,
              which preferably expands over multiple lines.
            </p>
            <Quote strokeWidth={0.5} className="absolute -bottom-4 -right-4 h-8 w-8 text-logo-primary fill-logo-primary" />
          </div>
          <div className="pt-6 relative">
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src="/Team/founder.webp"
                alt="Noor ul Hassan"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium">Noor ul Hassan AKA Geeky Hassan</h3>
              <p className="text-muted-foreground">Founder & CEO MyPath</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}