'use client'

import React from 'react'

import { Collection } from 'react-aria-components'
import { Tab, TabList, TabPanel, Tabs } from 'ui'

const tabs = [
  { id: 1, title: 'Overview', content: 'This is the overview tab content.' },
  { id: 2, title: 'Features', content: 'Details about the features are listed here.' },
  { id: 3, title: 'Pricing', content: 'Find the pricing information on this tab.' },
  { id: 4, title: 'Reviews', content: 'Read user reviews and ratings here.' }
]

export default function TabsCollectionsDemo() {
  return (
    <Tabs aria-label="Project Management">
      <TabList aria-label="Dynamic tabs" items={tabs}>
        {(item) => <Tab>{item.title}</Tab>}
      </TabList>

      <Collection items={tabs}>{(item) => <TabPanel key={item.id}>{item.content}</TabPanel>}</Collection>
    </Tabs>
  )
}
