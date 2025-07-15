export interface GoldPackage {
  id: string
  name: string
  gold: number
  price: number
  bonus?: number
  popular?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>
}