import { KPIs } from '@/components/dashboard/KPIs';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { LeadsByStatusPie } from '@/components/charts/LeadsByStatusPie';
import { LatestDevisList } from '@/components/devis/LatestDevisList';
import { captureError } from '@/lib/sentry';

export default function Dashboard() {
  // TODO: Supprimer après test Sentry
  const testSentry = () => {
    captureError(new Error("Test Sentry ToitureAI Dashboard - " + new Date().toISOString()));
    alert("Erreur envoyée à Sentry ! Vérifie ton dashboard Sentry.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
        </div>
        {/* TODO: Supprimer ce bouton après test */}
        <button
          onClick={testSentry}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Test Sentry
        </button>
      </div>

      <KPIs />

      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart />
        <LeadsByStatusPie />
      </div>

      <LatestDevisList />
    </div>
  );
}
