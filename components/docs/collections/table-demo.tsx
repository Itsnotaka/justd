'use client'

import { NumberFormatter } from '@internationalized/number'
import { IconDotsVertical } from 'justd-icons'
import { Card, Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger, Table } from 'ui'

export default function TableDemo() {
  const formatter = new NumberFormatter('en-US', { style: 'currency', currency: 'USD' })

  const priceFormat = (price: number) => formatter.format(price)
  return (
    <Card>
      <Table aria-label="Products">
        <Table.Header>
          <Table.Column>#</Table.Column>
          <Table.Column isRowHeader>Name</Table.Column>
          <Table.Column>Category</Table.Column>
          <Table.Column>Price</Table.Column>
          <Table.Column>Stock</Table.Column>
          <Table.Column />
        </Table.Header>
        <Table.Body items={products}>
          {(item) => (
            <Table.Row href="/collections/table-demo" id={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>{priceFormat(item.price)}</Table.Cell>
              <Table.Cell>{item.stock}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-end">
                  <Menu>
                    <MenuTrigger>
                      <IconDotsVertical />
                    </MenuTrigger>
                    <MenuContent aria-label="Actions" showArrow placement="left">
                      <MenuItem>View</MenuItem>
                      <MenuItem>Edit</MenuItem>
                      <MenuSeparator />
                      <MenuItem isDanger>Delete</MenuItem>
                    </MenuContent>
                  </Menu>
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Card>
  )
}

export const products = [
  { id: '1', name: 'iPhone 13', category: 'Electronics', price: 799, brand: 'Apple', stock: 150 },
  {
    id: '2',
    name: 'Galaxy S21',
    category: 'Electronics',
    price: 699,
    brand: 'Samsung',
    stock: 200
  },
  { id: '3', name: 'MacBook Pro', category: 'Computers', price: 1299, brand: 'Apple', stock: 80 },
  { id: '4', name: 'Dell XPS 13', category: 'Computers', price: 999, brand: 'Dell', stock: 50 },
  {
    id: '5',
    name: 'Sony WH-1000XM4',
    category: 'Headphones',
    price: 349,
    brand: 'Sony',
    stock: 120
  },
  { id: '6', name: 'AirPods Pro', category: 'Headphones', price: 249, brand: 'Apple', stock: 180 },
  {
    id: '7',
    name: 'Fitbit Charge 5',
    category: 'Wearables',
    price: 179,
    brand: 'Fitbit',
    stock: 75
  }
]
