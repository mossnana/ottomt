import React from 'react'

import { PhasesContextComponent, SearchContextComponent, UserContextComponent } from './Providers'
import { RouterComponent } from './Router'
import { SearchPage } from './Pages'

function App() {
  return (
    <div className='body'>
      <UserContextComponent>
        <SearchContextComponent>
          <PhasesContextComponent>
            <RouterComponent />
          </PhasesContextComponent>
        </SearchContextComponent>
      </UserContextComponent>
    </div>
  )
}

export default App
