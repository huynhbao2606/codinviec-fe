"use client";

import { UiButton } from "@/components/ui/base/UiButton";

export default function HomePage() {

  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold text-blue-600">Trang Chủ</h1>
      <div className="space-y-4 p-8 bg-background min-h-screen">
        <div className="min-h-screen p-8 space-y-6">
          <h1 className="text-2xl font-bold text-primary">CodinViec UI Demo</h1>

          <UiButton variantCustom={"primary"}>Button</UiButton>
          <UiButton variantCustom={"accent"}>Button</UiButton>
        </div>
      </div>
    </section>
  );
}
