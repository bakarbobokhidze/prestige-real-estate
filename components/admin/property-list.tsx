"use client";

import { Property } from "@/types/property";
import { Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

interface PropertyListProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export function PropertyList({
  properties,
  onEdit,
  onDelete,
}: PropertyListProps) {
  const formatPrice = (
    price: { gel: number; usd: number },
    category: string,
  ) => {
    const suffix = category === "rent" ? "/თვე" : "";

    const gel = price?.gel ?? 0;
    const usd = price?.usd ?? 0;

    return (
      <div className="flex flex-col text-sm">
        <span className="font-semibold text-foreground">
          {gel.toLocaleString()} ₾{suffix}
        </span>
        <span className="text-muted-foreground">
          $ {usd.toLocaleString()}
          {suffix}
        </span>
      </div>
    );
  };

  const categoryLabels: Record<string, string> = {
    sale: "იყიდება",
    rent: "ქირავდება",
  };

  const typeLabels: Record<string, string> = {
    apartment: "ბინა",
    house: "სახლი",
    villa: "ვილა",
    penthouse: "პენტჰაუსი",
    land: "მიწა",
    commercial: "კომერციული",
  };

  const statusLabels: Record<string, string> = {
    available: "ხელმისაწვდომი",
    pending: "მოლოდინში",
    sold: "გაყიდული",
    rented: "გაქირავებული",
  };

  const { language } = useLanguage();
  const lang = (language === "ge" || language === "en" ? language : "ge") as
    | "ge"
    | "en";

  return (
    <div className="border border-border rounded-md bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">სურათი</TableHead>
            <TableHead>სათაური</TableHead>
            <TableHead>კატეგორია</TableHead>
            <TableHead>ტიპი</TableHead>
            <TableHead>ფასი</TableHead>
            <TableHead>სტატუსი</TableHead>
            <TableHead className="text-right">მოქმედებები</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                ქონება ვერ მოიძებნა
              </TableCell>
            </TableRow>
          ) : (
            properties.map((property) => (
              <TableRow key={property._id}>
                <TableCell>
                  <div className="w-16 h-12 overflow-hidden rounded bg-muted">
                    {property.images[0] ? (
                      <img
                        src={property.images[0]}
                        alt={property.title[lang] || "Property"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium max-w-[200px] truncate">
                  {property.title[lang]}
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {categoryLabels[property.category] || property.category}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {typeLabels[property.propertyType] || property.propertyType}
                  </span>
                </TableCell>
                <TableCell>
                  {formatPrice(property.price, property.category)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded ${
                      property.status === "available"
                        ? "bg-green-500/10 text-green-600"
                        : property.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {statusLabels[property.status] || property.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">მოქმედებები</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/property/${property._id}`}
                          className="flex items-center w-full"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          ნახვა
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(property)}>
                        <Edit className="h-4 w-4 mr-2" />
                        რედაქტირება
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            წაშლა
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>ქონების წაშლა</AlertDialogTitle>
                            <AlertDialogDescription>
                              დარწმუნებული ხართ რომ გსურთ &quot;
                              {property.title[lang]}&quot;-ის წაშლა? ეს
                              მოქმედება შეუქცევადია.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>გაუქმება</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(property._id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              წაშლა
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
