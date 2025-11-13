import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AutoSuccess = () => {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount") || "0.00";
  const merchant = searchParams.get("merchant") || "Merchant";
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Auto-redirect after a few seconds
    const timer = setTimeout(() => {
      // navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center">
          {/* Success Animation */}
          <div className="mb-6 relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-success/10 flex items-center justify-center animate-pulse">
              <CheckCircle2 className="h-16 w-16 text-success" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-success/20 animate-ping" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Auto-payment processed instantly
          </p>

          {/* Payment Details */}
          <div className="space-y-4 mb-8">
            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
              <p className="text-3xl font-bold text-success">
                ${amount}
              </p>
            </Card>

            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Paid To</p>
              <p className="text-xl font-semibold">{merchant}</p>
            </Card>

            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
              <p className="text-sm font-mono">TXN-{Date.now().toString().slice(-8)}</p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full h-12"
              onClick={() => navigate("/")}
            >
              Back to Home
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/history")}
            >
              View Transaction History
            </Button>
          </div>

          {/* Info Note */}
          <p className="text-xs text-muted-foreground mt-6">
            Auto-payments are instant and don't require PIN verification. 
            You can manage auto-pay settings in your profile.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AutoSuccess;
