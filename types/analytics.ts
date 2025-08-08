export type FormType = "consultation" | "sales" | "contact"

interface DataLayerEvent {
  event: "form_submit"
  formType: FormType
  // Add other optional properties if needed in the future
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[]
  }
}

export function trackFormSubmit(formType: FormType) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "form_submit",
      formType: formType,
    })
    console.log(`DataLayer event pushed: form_submit, formType: ${formType}`) // For debugging
  } else {
    console.warn("window.dataLayer is not available.")
  }
}
