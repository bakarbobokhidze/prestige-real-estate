"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, User, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import emailjs from "@emailjs/browser";

interface ContactFormProps {
  propertyTitle: string;
}

export function ContactForm({ propertyTitle }: ContactFormProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `დაინტერესებული ვარ "${propertyTitle}"-ით. გთხოვთ დამიკავშირდეთ დამატებითი ინფორმაციისთვის.`,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          property_name: propertyTitle,
        },
        PUBLIC_KEY,
      );

      console.log("Form submitted successfully:", formData);
      setIsSubmitted(true);
    } catch (err) {
      setError("გაგზავნისას მოხდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-border shadow-lg animate-in fade-in zoom-in duration-300">
        <CardContent className="pt-8">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              {t("thankYou") || "გმადლობთ!"}
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("contactSuccess") ||
                "თქვენი მოთხოვნა გაგზავნილია. ჩვენი გუნდი მალე დაგიკავშირდებათ."}
            </p>
            <Button
              variant="outline"
              className="mt-8"
              onClick={() => setIsSubmitted(false)}
            >
              {t("back") || "უკან"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border shadow-md">
      <CardHeader className="bg-muted/30 border-b">
        <CardTitle className="text-xl font-bold">
          {t("requestInfo") || "ინფორმაციის მოთხოვნა"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              {t("name") || "სახელი"}
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder={t("namePlaceholder") || "თქვენი სახელი"}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="pl-10 h-11 focus-visible:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              {t("email") || "ელ-ფოსტა"}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="pl-10 h-11 focus-visible:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold">
              {t("phone") || "ტელეფონი"}
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="(5XX) XX-XX-XX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="pl-10 h-11 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold">
              {t("message") || "შეტყობინება"}
            </Label>
            <Textarea
              id="message"
              placeholder={t("messagePlaceholder") || "თქვენი შეტყობინება..."}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="resize-none focus-visible:ring-primary"
              required
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg font-bold shadow-lg transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("sending") || "იგზავნება..."}
              </>
            ) : (
              t("sendRequest") || "მოთხოვნის გაგზავნა"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
