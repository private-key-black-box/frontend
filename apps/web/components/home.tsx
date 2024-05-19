import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Cog } from "lucide-react";
import { useState } from "react";
import { Header } from "./header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Friends } from "@/components/ui/friends";
import { useForm, FormProvider } from "react-hook-form";
import { TransferForm } from "./wallet/transfer-form";

export interface HomeProps {
  wallet: JSX.Element;
}

export function Home({ wallet }: HomeProps) {
  const [tab, setTab] = useState("transfer");

  const methods = useForm(); // Initialize form methods for useFormContext

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-center">
        <Toaster />
        <div className="flex basis-11/12 flex-col 2xl:basis-10/12">
          <Header />
          <div className="flex justify-between mt-12">
            <div className="w-[32.31%] h-[32.31%]"> {/* Decreased width by 10% from 35.9% to 32.31% */}
              <Friends />
            </div>
            <div className="flex justify-center w-[42.32%]"> {/* Reduced width by 15% from 56.84% to 48.32% */}
              <div className="max-w-2xl basis-11/12 justify-center">
                <Tabs activationMode="manual" value={tab}>
                  <div className="mb-4 flex justify-between">
                    <TabsList className="border border-muted bg-transparent">
                      <TabsTrigger
                        onClick={() => setTab("transfer")}
                        value="transfer"
                        className="data-[state=active]:bg-muted"
                      >
                        Transfer
                      </TabsTrigger>
                    </TabsList>

                    <Popover>
                      <PopoverTrigger disabled={true}>
                        <Button
                          disabled={true}
                          size="icon"
                          variant="outline"
                          className="rounded-xl text-muted-foreground"
                        >
                          <Cog className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        Place content for the popover here.
                      </PopoverContent>
                    </Popover>
                  </div>

                  <TabsContent value="transfer">
                    <TransferForm />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="w-1/5">
              {wallet}
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}