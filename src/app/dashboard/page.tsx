import React from "react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-card p-8 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard</h2>
          <p className="text-muted-foreground">
            This is a placeholder for the dashboard page with its own layout and
            header, completely separate from the landing page design.
          </p>
        </div>
      </main>
    </div>
  );
}
