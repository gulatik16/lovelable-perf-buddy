import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const PDFExport = () => {
  const handlePrintToPDF = () => {
    // Hide navigation elements for PDF
    const navigationElements = document.querySelectorAll('[data-pdf-hide]');
    navigationElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });

    // Print the page
    window.print();

    // Restore navigation elements
    setTimeout(() => {
      navigationElements.forEach(el => {
        (el as HTMLElement).style.display = '';
      });
    }, 1000);
  };

  return (
    <Button 
      onClick={handlePrintToPDF}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
    >
      <Download className="w-4 h-4 mr-2" />
      Export PDF
    </Button>
  );
};