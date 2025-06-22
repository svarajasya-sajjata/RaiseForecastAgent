"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props} className="bg-slate-800 border-slate-700 text-slate-100">
          <div className="grid gap-1">
            {title && <ToastTitle className="text-slate-100">{title}</ToastTitle>}
            {description && <ToastDescription className="text-slate-300">{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose className="text-slate-400 hover:text-slate-100" />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
