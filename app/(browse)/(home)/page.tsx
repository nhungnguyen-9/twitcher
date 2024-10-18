import { Suspense } from "react";
import { Result, ResultsSkeleton } from "./_components/result";


export default function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton/>}>
      <Result/>
      </Suspense>
    </div>
  );
}
