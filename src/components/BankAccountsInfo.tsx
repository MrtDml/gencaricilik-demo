"use client";

import { useEffect, useState } from "react";
import { Building2, Copy, CheckCheck } from "lucide-react";

interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  iban: string;
  branch?: string | null;
}

interface Props {
  compact?: boolean;
}

export default function BankAccountsInfo({ compact = false }: Props) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/bank-accounts")
      .then((r) => r.json())
      .then((data) => setAccounts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const copyIban = (id: string, iban: string) => {
    navigator.clipboard.writeText(iban).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (accounts.length === 0) return null;

  if (compact) {
    return (
      <div className="space-y-3">
        {accounts.map((acc) => (
          <div key={acc.id} className="text-sm">
            <p className="font-semibold text-white">{acc.bankName}</p>
            <p className="text-gray-400 text-xs">{acc.accountName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-primary font-mono text-xs">{acc.iban}</span>
              <button
                onClick={() => copyIban(acc.id, acc.iban)}
                className="text-gray-500 hover:text-primary transition-colors"
                title="Kopyala"
              >
                {copiedId === acc.id ? <CheckCheck size={12} /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {accounts.map((acc) => (
        <div
          key={acc.id}
          className="glass rounded-xl p-4 border border-white/10 flex items-start justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-bold text-white">{acc.bankName}</p>
              <p className="text-gray-400 text-sm">{acc.accountName}</p>
              {acc.branch && <p className="text-gray-500 text-xs mt-0.5">{acc.branch} Şubesi</p>}
              <p className="font-mono text-primary text-sm mt-1 tracking-wide">{acc.iban}</p>
            </div>
          </div>
          <button
            onClick={() => copyIban(acc.id, acc.iban)}
            className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors bg-white/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg"
          >
            {copiedId === acc.id ? (
              <><CheckCheck size={14} className="text-green-400" /> Kopyalandı</>
            ) : (
              <><Copy size={14} /> Kopyala</>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
