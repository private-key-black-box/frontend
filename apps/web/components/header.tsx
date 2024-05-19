export function Header() {
  return (
    <div className="flex justify-center pt-6">
      <div className="flex basis-11/12 items-center justify-start space-x-6 py-4">
        <img className="max-h-16" src="logo.png" alt="Logo" />
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-start">
            <p className="text-xl font-bold">GM, Harry! 😊</p>
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold">POPKORN</p>
              <p className="text-sm">
                Proof Of Private Key Ownership Requiring Nothing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}