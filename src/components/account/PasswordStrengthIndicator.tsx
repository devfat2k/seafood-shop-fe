'use client';

function getPasswordStrength(pass: string) {
  if (!pass) {
    return { score: 0, label: '', color: 'bg-muted' };
  }
  let score = 0;
  if (pass.length >= 6) {
    score += 1;
  }
  if (pass.length >= 10) {
    score += 1;
  }
  if (/[A-Z]/u.test(pass)) {
    score += 1;
  }
  if (/[0-9]/u.test(pass)) {
    score += 1;
  }
  if (/[^A-Za-z0-9]/u.test(pass)) {
    score += 1;
  }

  if (score <= 2) {
    return { score: 33, label: 'Mật khẩu yếu', color: 'bg-destructive' };
  }
  if (score <= 4) {
    return { score: 66, label: 'Mật khẩu trung bình', color: 'bg-accent' };
  }
  return { score: 100, label: 'Mật khẩu mạnh & an toàn', color: 'bg-tertiary' };
}

export function PasswordStrengthIndicator({ password }: { password: string }) {
  if (!password) {
    return null;
  }

  const strength = getPasswordStrength(password);

  return (
    <div className="mt-2.5 rounded-xl border border-border/60 bg-background p-3">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">Độ mạnh mật khẩu:</span>
        <span className="font-bold text-foreground">{strength.label}</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${strength.score}%` }}
        />
      </div>
    </div>
  );
}
