
import React, { useState, useRef, KeyboardEvent, ClipboardEvent, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  className?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  className,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Consider only the last character if multiple characters are pasted/entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    const newOtpString = newOtp.join("");
    if (newOtpString.length === length) {
      onComplete(newOtpString);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move to previous input on left arrow
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      // Move to next input on right arrow
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();
    
    if (!/^\d+$/.test(pasteData)) return; // Only allow digits
    
    const newOtp = [...otp];
    for (let i = 0; i < Math.min(length, pasteData.length); i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
    
    // Move focus to the appropriate input
    if (pasteData.length < length) {
      inputRefs.current[pasteData.length]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }
    
    // Check if OTP is complete
    const newOtpString = newOtp.join("");
    if (newOtpString.length === length) {
      onComplete(newOtpString);
    }
  };

  return (
    <div className={cn("flex justify-center gap-2", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className="w-12 h-14 text-center text-xl rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          aria-label={`Digit ${index + 1}`}
          autoComplete={index === 0 ? "one-time-code" : "off"}
        />
      ))}
    </div>
  );
};

export default OTPInput;
