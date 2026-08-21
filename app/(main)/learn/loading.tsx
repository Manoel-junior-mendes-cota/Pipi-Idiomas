import { Loader } from "lucide-react";

const Loading = () => {
  return ( 
    <div className="h-full w-full min-h-[50vh] flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" aria-label="Carregando..." />
    </div>
  );
};
 
export default Loading;
