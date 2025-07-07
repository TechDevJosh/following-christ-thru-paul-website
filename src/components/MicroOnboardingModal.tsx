import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import Link from 'next/link';

interface MicroOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MicroOnboardingModal({ isOpen, onClose }: MicroOnboardingModalProps) {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleClose = () => {
    setStep(1); // Reset to first step on close
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="mb-4">
            <DialogTitle className="font-heading text-2xl text-gray-900">Welcome to Following Christ Thru Paul</DialogTitle>
            <DialogDescription className="font-body text-gray-600 mt-2">
              Quick guide to help you get started.
            </DialogDescription>
          </div>

          {step === 1 && (
            <div>
              <h3 className="font-subheading text-xl text-gray-800 mb-3">Step 1: Explore Topics</h3>
              <p className="font-body text-gray-700 mb-4">
                Dive into our thematic studies on various biblical subjects. This is a great place to start if you have a specific area of interest.
              </p>
              <Link href="/topics" className="btn-primary w-full text-center" onClick={handleClose}>Browse Topics</Link>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-subheading text-xl text-gray-800 mb-3">Step 2: Verse by Verse Studies</h3>
              <p className="font-body text-gray-700 mb-4">
                Engage with in-depth expositions of Scripture, book by book. Perfect for systematic Bible study.
              </p>
              <Link href="/verse-by-verse" className="btn-primary w-full text-center" onClick={handleClose}>Start Verse by Verse</Link>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-subheading text-xl text-gray-800 mb-3">Step 3: Ask Questions</h3>
              <p className="font-body text-gray-700 mb-4">
                Have a question? Submit it to our ministry team for a Scripture-based answer.
              </p>
              <Link href="/ask" className="btn-primary w-full text-center" onClick={handleClose}>Ask a Question</Link>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button onClick={handleBack} className="btn-secondary">
                Back
              </button>
            )}
            {step < 3 && (
              <button onClick={handleNext} className="btn-primary">
                Next
              </button>
            )}
            {step === 3 && (
              <button onClick={handleClose} className="btn-primary">
                Finish
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
