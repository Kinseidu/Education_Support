import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Confirm = () => {
  const [searchParams] = useSearchParams();
  const recipient = searchParams.get("recipient") || "Unknown Recipient";
  const defaultAmount = searchParams.get("amount") || "0";
  
  const [amount, setAmount] = useState(defaultAmount);
  const [pin, setPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleConfirmPayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (pin.length !== 4) {
      toast.error("Please enter your 4-digit PIN");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Payment of $${amount} sent successfully!`);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-6 pt-12 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Confirm Payment</h1>
            <p className="text-muted-foreground">Review and authorize</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Recipient Card */}
          <Card className="p-6 bg-gradient-card">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {recipient.charAt(0)}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-1">{recipient}</h2>
              <p className="text-sm text-muted-foreground">Recipient</p>
            </div>
          </Card>

          {/* Amount Input */}
          <Card className="p-6">
            <Label htmlFor="amount" className="text-base font-semibold mb-2 block">
              Payment Amount
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-3xl font-bold pl-12 h-16"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </Card>

          {/* PIN Input */}
          <Card className="p-6">
            <Label htmlFor="pin" className="text-base font-semibold mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Enter PIN to Confirm
            </Label>
            <Input
              id="pin"
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="text-2xl tracking-widest text-center h-14"
              placeholder="••••"
            />
            <p className="text-xs text-muted-foreground mt-2">
              For demo: use any 4 digits
            </p>
          </Card>

          {/* Confirm Button */}
          <Button
            className="w-full h-14 text-lg font-semibold"
            onClick={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Pay $${amount || "0.00"}`}
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
