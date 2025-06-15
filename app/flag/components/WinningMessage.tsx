import { Flag } from "lucide-react";

export const WinningMessage = () => {
  return (
    <div className="w-full flex justify-center">
      <div
        className="flex flex-col items-start space-y-4 p-6 rounded-xl bg-card/80
      backdrop-blur-sm border-b-8 border-border max-w-md"
      >
        <div className="flex space-x-2">
          <Flag className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium text-primary">Félicitations !</h3>
        </div>
        <p className="text-left text-card-foreground">
          Vous avez correctement identifié le drapeau du jour <br /> à demain
          pour le prochain drapeau !
        </p>
      </div>
    </div>
  );
};
