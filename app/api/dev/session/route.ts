import { NextResponse } from "next/server";

import { DEV_COOKIE, isDevAdminBypassAllowed, isDevPortalEnabled } from "@/lib/dev-mode";

/** Set or clear dev preview cookies (development / NEXT_PUBLIC_DEV_PORTAL only). */
export async function POST(request: Request) {
  if (!isDevPortalEnabled()) {
    return NextResponse.json({ error: "disabled" }, { status: 403 });
  }

  let body: { admin?: boolean; wardSlug?: string | null };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });

  if (body.admin && isDevAdminBypassAllowed()) {
    res.cookies.set(DEV_COOKIE.adminBypass, "1", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
    });
  } else {
    res.cookies.delete(DEV_COOKIE.adminBypass);
  }

  if (body.wardSlug && typeof body.wardSlug === "string") {
    res.cookies.set(DEV_COOKIE.wardDemoSlug, body.wardSlug, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
    });
  } else {
    res.cookies.delete(DEV_COOKIE.wardDemoSlug);
  }

  return res;
}

export async function DELETE() {
  if (!isDevPortalEnabled()) {
    return NextResponse.json({ error: "disabled" }, { status: 403 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(DEV_COOKIE.adminBypass);
  res.cookies.delete(DEV_COOKIE.wardDemoSlug);
  return res;
}
