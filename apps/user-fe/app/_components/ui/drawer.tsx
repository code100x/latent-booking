"use client";

import { Drawer } from "vaul";

export default function Sheet({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[100]" />
        <Drawer.Content className="bg-neutral-900 h-[85vh] fixed bottom-0 left-0 right-0 outline-none rounded-t-xl z-[101]">
          <div className="p-4">
            <div className="w-12 h-1.5 bg-neutral-700 rounded-full mx-auto mb-8" />
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
