"use client"

import { Button, Card, Checkbox, Switch } from "ui"

export function Buttons() {
  return (
    <div className="gap-2 grid">
      <Card className="grid py-4 place-content-center [&>div]:px-4 gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Button>Label</Button>
          <Button intent="secondary">Label</Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button appearance="outline">Label</Button>
          <Button appearance="plain">Label</Button>
        </div>
      </Card>
      <Card className="grid place-content-center p-4">
        <Checkbox defaultSelected>Remember me</Checkbox>
      </Card>
      <Card className="grid place-content-center p-4">
        <Switch defaultSelected>Toggle Theme</Switch>
      </Card>
    </div>
  )
}
