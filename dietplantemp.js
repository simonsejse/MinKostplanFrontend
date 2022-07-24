<motion.div
  key='section-one'
  initial={{
    opacity: 0,
    x: 1000,
  }}
  animate={{
    opacity: 1,
    x: 0,
    transition: { delay: 0.6, duration: 0.4 },
  }}
  exit={{ opacity: 0, x: 1000 }}
  id='div-content'
  className='p-[50px] space-y-4 max-h-full'
>
  <div id='form-row' className='flex items-center'>
    <label
      className='w-[200px] text-lg font-oswald font-normal uppercase text-gray-600 leading-none'
      id='diet-plan-name'
    >
      Kostplan navn
    </label>
    <div className='flex-1'>
      <input
        type='text'
        name='name'
        value={state.sectionOne.name}
        onChange={(e) => changeValue(e.target.name, e.target.value)}
        className='p-3 w-1/3 shadow-lg bg-gray-200 border rounded border-gray-300 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
        aria-label='diet-plan-name'
        aria-required='true'
        placeholder='Navn på kostplan'
      />
    </div>
  </div>
  <div id='form-row' className='flex items-center'>
    <label
      className='w-[200px] text-lg font-oswald font-normal uppercase text-gray-600 leading-none'
      id='diet-plan-name'
    >
      Formål
    </label>
    <div className='flex-1'>
      <DropDownSelect
        value={state.sectionOne.purpose}
        setValue={setDropDownValue}
      />
    </div>
  </div>
  <div id='form-row' className='flex items-center'>
    <label
      className='w-[200px] text-lg font-oswald font-normal uppercase text-gray-600 leading-none'
      id='diet-plan-name'
    >
      Tags
    </label>
    <div className='flex-1'>
      <div className='w-1/2'>
        <Tags
          text='Tilføj opskrift tags! Eksempelvis. sundt, bla. bla.. osv.'
          ref={tagsRef}
        />
      </div>
    </div>
  </div>
  <div className='divide-y divide-gray-600 mb-5 mt-5'>
    <div />
    <div />
  </div>
  <section className='flex flex-col md:flex-row justify-between'>
    <div className='m-4 md:m-0 md:w-1/2 md:divide-x-reverse md:divide-x-2 divide-gray-600'>
      <h1 className='text-black font-poppins text-xl font-bold block uppercase tracking-wide'>
        makrofordeling
      </h1>
      <p className='text-black font-poppins md:pr-4'>
        Hvad er makrofordeling, og hvorfor er det relevant, når jeg skal opbygge
        min kostplan. Makroer er en fællesbetegnelse for kulhydrater, fedt og
        protein. Fordelingen er så, hvordan vi fordeler hhv. protein, kulhydrat
        og protein som udgør vores samlede mængde kalorier. Derfor har vi fokus
        på, at du får dine kalorier fra de rigtige makronæringsstoffer. Disse
        får du gennem kulhydrat, protein og fedt. Og det er denne fordeling, som
        kaldes for makrofordelingen (eller makrotal, hvis disse regnes i tal).
        Herunder ses normale makrofordelinger for hhv. vægttab, vedligeholdelse
        samt muskelopbygning.
      </p>
      <div className='pt-6 mb-4'>
        <table className='w-full table-fixed transform duration-150 text-xs lg:text-[16px] text-center text-black divide-x-2 divide-y-2 divide-gray-600'>
          <thead>
            <tr>
              <th className='break-all'>Vægttab</th>
              <th className='break-all'>Vedligeholdelse</th>
              <th className='break-all'>Muskelopbygning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>35% Protein</td>
              <td>15% Protein</td>
              <td>25% Protein</td>
            </tr>
            <tr>
              <td>50% Kulhydrat</td>
              <td>55% Kulhydrat</td>
              <td>40% Kulhydrat</td>
            </tr>
            <tr>
              <td>
                15% Fedt <br />
                <button
                  onClick={() =>
                    dispatch({
                      type: actions.CHANGE_MACROS,
                      payload: {
                        proteinMacro: 35,
                        carbsMacro: 50,
                        fatMacro: 15,
                      },
                    })
                  }
                  className='px-5 py-2 text-black rounded-full bg-cyan-500 hover:bg-cyan-700 hover:shadow-xl shadow-lg shadow-cyan-500/60 mt-2 transform duration-300 hover:tracking-widest hover:cursor-pointer font-bold '
                >
                  Vælg
                </button>
              </td>
              <td>
                30% Fedt <br />
                <button
                  onClick={() =>
                    dispatch({
                      type: actions.CHANGE_MACROS,
                      payload: {
                        proteinMacro: 15,
                        carbsMacro: 55,
                        fatMacro: 30,
                      },
                    })
                  }
                  className='px-5 py-2 text-black rounded-full bg-cyan-500 hover:bg-cyan-700 hover:shadow-xl shadow-lg shadow-cyan-500/60 mt-2 transform duration-300 hover:tracking-widest hover:cursor-pointer font-bold '
                >
                  Vælg
                </button>
              </td>
              <td>
                35% Fedt
                <br />
                <button
                  onClick={() =>
                    dispatch({
                      type: actions.CHANGE_MACROS,
                      payload: {
                        proteinMacro: 25,
                        carbsMacro: 40,
                        fatMacro: 35,
                      },
                    })
                  }
                  className='px-5 py-2 text-black rounded-full bg-cyan-500 hover:bg-cyan-700 hover:shadow-xl shadow-lg shadow-cyan-500/60 mt-2 transform duration-300 hover:tracking-widest hover:cursor-pointer font-bold '
                >
                  Vælg
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className='md:grid md:grid-rows-3 m-4 space-y-4 md:space-y-0 md:m-0 gap-4'>
      <div className='w-full md:ml-4 md:w-64 md:mb-0'>
        <label
          className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
          htmlFor='proteinMacro'
        >
          Protein
        </label>
        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          id='proteinMacro'
          name='proteinMacro'
          value={state.sectionOne.proteinMacro}
          onChange={(e) => changeValue(e.target.name, e.target.value)}
          type='number'
          placeholder='Protein i %'
        ></input>
      </div>
      <div className='w-full md:ml-4 md:w-64 md:mb-0'>
        <label
          className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
          htmlFor='carbsMacro'
        >
          Kulhydrat
        </label>
        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          id='carbsMacro'
          name='carbsMacro'
          value={state.sectionOne.carbsMacro}
          onChange={(e) => changeValue(e.target.name, e.target.value)}
          type='number'
          placeholder='Kulhydrat i %'
        ></input>
      </div>
      <div className='w-full md:ml-4 md:w-64 md:mb-0'>
        <label
          className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
          htmlFor='fatMacro'
        >
          Fedt
        </label>
        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          id='fatMacro'
          name='fatMacro'
          value={state.sectionOne.fatMacro}
          onChange={(e) => changeValue(e.target.name, e.target.value)}
          type='number'
          placeholder='Fedt i %'
        ></input>
      </div>
    </div>
  </section>
  <div className='divide-y divide-gray-600 mb-5 mt-5'>
    <div></div>
    <div></div>
  </div>
  <section className='h-[200px] overflow-y-auto'>
    <header>
      <h1 className='text-center md:text-left md:ml-4 text-gray-100 text-xl font-bold block uppercase tracking-wide'>
        Måltider
      </h1>
    </header>
    <div className='flex flex-col items-center md:items-start md:flex-row md:justify-between'>
      <div className='md:w-2/5 m-4 md:m-0'>
        <label
          htmlFor='mealCount'
          className='text-center ml-3 md:pl-4 text-black'
        >
          Antal måltider
        </label>
        <div className='flex justify-center md:justify-start md:ml-4 md:mt-2'>
          <input
            type='range'
            className='hover:animate-pulse w-full transform duration-300 appearance-none bg-transparent px-4 py-1 border-4 border-double border-blue-500 shadow-blue-500/50 rounded-full shadow-lg'
            value={state.sectionOne.mealCount}
            onChange={(e) => changeValue(e.target.name, e.target.value)}
            name='mealCount'
            min='1'
            max='5'
            step='1'
            id='mealCount'
          />
          <output className='ml-3 text-black text-2xl font-bold'>
            {state.sectionOne.mealCount}
          </output>
        </div>
      </div>

      <div className='flex flex-col space-y-4 mb-4'>{items}</div>
    </div>
  </section>
  <div className='divide-y divide-gray-600 mb-5 mt-5'>
    <div></div>
    <div></div>
  </div>
  <section>
    <header>
      <h1 className='m-4 md:m-0 text-black text-xl font-bold block uppercase tracking-wide'>
        Vægttab - Vedligeholdelse - Muskelopbygning
      </h1>
      <p className='m-4 md:m-0 text-black font-poppins text-[14px] block tracking-wide'>
        Forestil dig din krop som et regnestykke. Er du en gennemsnitlig mand
        forbrænder du ca. 2.200 kalorier dagligt, og er du en gennemsnitlig
        kvinde forbrænder du 1.800 kalorier. Det vil sige, at hvis du indtager
        dette antal kalorier på en dag, vil du hverken tabe dig eller tage på
        (ligevægtsindtag). Indtager du flere kalorier, end du forbrænder, tager
        du på. Indtager du færre kalorier, taber du dig. Det er ikke sikkert, at
        du ligger inden for gennemsnittet. Der er mange faktorer, der spiller
        ind på hvilket vedligeholdelsesindtag, du har. Det kan f.eks. være din
        alder, vægt, motion og hvor aktiv du er i hverdagen.
        <br />
        Vil du gerne regulere din vægt, kan du enten øge dit kalorieindtag eller
        reducere det. Ved et vægttab kan kalorieindtaget reduceres med ca. 500
        kcal dagligt. Det vil give et vægttab på cirka 0,5 kg. om ugen. Er du
        derimod i mellem 500 og 1000 kalorier i underskud om dagen, vil dette
        give et vægttab på 0,5-1 kg pr uge. Denne kaloriereduktion er langt
        nemmere at håndtere og bevare. Som vægten falder, bliver det for mange
        sværere at tabe sig. Du skal derfor være tålmodig og vedholdende.
      </p>

      <h1 className='m-4 md:m-0 md:mt-4 text-black text-xl font-bold block uppercase tracking-wide'>
        Til det store spørgsmål - hvor mange kilo vil du tabe/opbygge pr. uge?
      </h1>
      <p className='m-4 md:m-0 text-black text-[14px] block tracking-wide'>
        (0 hvis vedligeholdelsesindtag)
      </p>
      <div className='flex justify-center md:justify-start'>
        <input
          className='appearance-none shadow-lg block w-60 bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          type='number'
          placeholder='Kilo pr. uge'
        />
      </div>
    </header>
  </section>

  <div className='w-full flex justify-end'>
    <button
      onClick={() => goToNextSection()}
      className='flex self-end bg-accent p-4 text-right text-white rounded-md pr-6'
    >
      <svg
        className='w-6 h-6 text-gray-400'
        fill='white'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
          clip-rule='evenodd'
        ></path>
      </svg>
      {state.section <= 2 ? 'Næste' : 'Færdiggør'}
    </button>
  </div>
</motion.div>;
