function Layout({children}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            Firebase Saga
          </span>
        </div>
      </nav>
      <div className="w-100 h-100">
      {children}
      </div>
    </>
  );
}

export default Layout;
