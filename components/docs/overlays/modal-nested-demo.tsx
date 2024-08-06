'use client'

import React from 'react'

import { toast } from 'sonner'
import {
  Button,
  Form,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Textarea
} from 'ui'

export default function ModalNestedDemo() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = React.useState(false)
  const [isProfileSetupModalOpen, setIsProfileSetupModalOpen] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)

  return (
    <>
      <Button onPress={() => setIsRegistrationModalOpen(true)}>Register</Button>

      <ModalContent
        isOpen={isRegistrationModalOpen}
        onOpenChange={() => setIsRegistrationModalOpen(false)}
        aria-label="Confirm Registration"
      >
        <ModalHeader>
          <ModalTitle>Confirm Registration</ModalTitle>
          <ModalDescription>Please confirm your registration details.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose>Cancel</ModalClose>
          <Button
            onPress={() => {
              setIsProfileSetupModalOpen(true)
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>

      <ModalContent
        isOpen={isProfileSetupModalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen && isTyping) {
            toast('Profile setup incomplete')
          }
          setIsProfileSetupModalOpen(isOpen)
        }}
        aria-label="Profile Setup"
      >
        <ModalHeader>
          <ModalTitle>Set Up Your Profile</ModalTitle>
          <ModalDescription>
            We need a bit more information before you can get started.
          </ModalDescription>
        </ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            toast.success('Profile setup complete')
            setIsProfileSetupModalOpen(false)
            setIsRegistrationModalOpen(false)
          }}
        >
          <ModalBody className="space-y-4">
            <Textarea
              isRequired
              label="Bio"
              placeholder="Tell us something about yourself"
              onInput={() => setIsTyping(true)}
            />
          </ModalBody>
          <ModalFooter>
            <ModalClose>Skip for now</ModalClose>
            <Button type="submit">Complete Setup</Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </>
  )
}
