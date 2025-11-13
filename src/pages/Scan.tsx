import { useState, useEffect } from "react";
import { QrCode as QrCodeIcon, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavBar from "@/components/ui/nav-bar";
import { QRCodeSVG } from "qrcode.react";
import { mockUser } from "@/lib/mockData";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Scan = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const [showMyQR, setShowMyQR] = useState(mode === "show");
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowMyQR(mode === "show");
  }, [mode]);

  const myQRData = JSON.stringify({
    userId: mockUser.id,
    name: mockUser.name,
    type: "instant",
  });

  const handleStartScan = () => {
    setScanning(true);
    // Simulate QR scan delay
    setTimeout(() => {
      setScanning(false);
      // Mock successful scan - navigate to confirm page
      navigate("/confirm?recipient=Sarah Williams&amount=50");
      toast.success("QR Code scanned successfully!");
    }, 2000);
  };

  const handleSimulateAutoPay = () => {
    // Simulate scanning an auto-pay QR code
    toast.success("Auto-payment QR detected!");
    setTimeout(() => {
      navigate("/auto-success?amount=25.50&merchant=Coffee Shop");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-6 pt-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {showMyQR ? "My QR Code" : "Scan QR Code"}
          </h1>
          <p className="text-muted-foreground">
            {showMyQR
              ? "Share this code to receive payments"
              : "Scan to send money instantly"}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            variant={!showMyQR ? "default" : "outline"}
            className="flex-1"
            onClick={() => setShowMyQR(false)}
          >
            <Camera className="mr-2 h-5 w-5" />
            Scan Code
          </Button>
          <Button
            variant={showMyQR ? "default" : "outline"}
            className="flex-1"
            onClick={() => setShowMyQR(true)}
          >
            <QrCodeIcon className="mr-2 h-5 w-5" />
            My Code
          </Button>
        </div>

        {showMyQR ? (
          /* Show My QR Code */
          <Card className="p-8">
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-2xl shadow-soft mb-6">
                <QRCodeSVG value={myQRData} size={240} level="H" />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold mb-1">{mockUser.name}</p>
                <p className="text-sm text-muted-foreground">{mockUser.email}</p>
              </div>
            </div>
          </Card>
        ) : (
          /* Scan QR Code */
          <div className="space-y-4">
            <Card className="aspect-square overflow-hidden relative bg-card">
              {scanning ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <div className="text-center text-white">
                    <div className="animate-pulse mb-4">
                      <Camera className="h-16 w-16 mx-auto" />
                    </div>
                    <p className="font-semibold">Scanning QR Code...</p>
                    <p className="text-sm opacity-80 mt-2">Hold steady</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-semibold mb-2">Point camera at QR code</p>
                    <p className="text-sm text-muted-foreground">
                      Position the QR code within the frame
                    </p>
                  </div>
                </div>
              )}

              {/* Scan frame overlay */}
              <div className="absolute inset-8 border-4 border-primary rounded-3xl pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
              </div>
            </Card>

            <Button
              className="w-full"
              size="lg"
              onClick={handleStartScan}
              disabled={scanning}
            >
              {scanning ? "Scanning..." : "Start Scanning"}
            </Button>

            {/* Demo/Test Buttons */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3 text-center">Quick Test:</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleStartScan}>
                  Test Instant Pay
                </Button>
                <Button variant="outline" onClick={handleSimulateAutoPay}>
                  Test Auto Pay
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
};

export default Scan;
