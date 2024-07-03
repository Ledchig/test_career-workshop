const LayoutForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-fit flex-col justify-center rounded-2xl bg-white px-12 py-8">
      {children}
    </div>
  )
}

export default LayoutForm
