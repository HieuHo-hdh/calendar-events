import { EVENT_TYPE, EVENT_TYPES } from "@/constants/event.constant";
import { handleParseArrayToLabelValueArray } from "@/utils/array.util";
import { ColorPicker, DatePicker, Form, Input, Modal, Radio, Select } from "antd"
import { Dayjs } from "dayjs";
import { FC, useEffect } from "react"

const { RangePicker } = DatePicker;

type CreateEventModalProps = {
  open: boolean
  onCancel: () => void;
  clickedDay: Dayjs
}

type CreateEventForm = {
  title: string,
  type: EVENT_TYPE,
  duration: [Dayjs, Dayjs],
  color: string,
}

const CreateEventModal: FC<CreateEventModalProps> = ({
  open,
  onCancel,
  clickedDay,
}) => {
  const [formCreateEvent] = Form.useForm()

  const handleCreateEvent = (formValues: CreateEventForm) => {
    // TODO: create event
    console.log('form::', formValues)
  }

  useEffect(() => {
    if (!open) formCreateEvent.resetFields()
  }, [open, formCreateEvent])

  const type = Form.useWatch('type', formCreateEvent)

  return (
    <Modal
      centered
      title={<span className="capitalize">Create {type}</span>}
      okText="Save"
      open={open}
      onCancel={onCancel}
      onOk={() => formCreateEvent.submit()}
    >
      <Form
        form={formCreateEvent}
        initialValues={{
          type: EVENT_TYPE.APPOINTMENT,
          duration: [clickedDay, clickedDay],
        }}
        onFinish={handleCreateEvent}
        labelCol={ {span: 4 }}
        wrapperCol={ {span: 26 }}
        layout="horizontal"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
        >
          <Radio.Group 
            className="capitalize"
            block
            options={handleParseArrayToLabelValueArray(EVENT_TYPES)}
            defaultValue={EVENT_TYPE.APPOINTMENT}
            optionType="button"
            buttonStyle="solid" 
          />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <RangePicker showTime format={"DD-MM-YYYY HH:mm"} className="w-full"/>
        </Form.Item>
        <Form.Item
          name="backgroundColor"
          label="Color"
        >
          <ColorPicker defaultValue={"#0F4C81"} />
        </Form.Item>
        {
          type === EVENT_TYPE.APPOINTMENT ? (
            <>
              <Form.Item
                name="link"
                label="Link"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="clientProfile"
                label="Client"
              >
                <Select />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="link"
                label="Link"
              >
                <Input />
              </Form.Item>
            </>
          )
        }
      </Form>
    </Modal>
  )
}

export default CreateEventModal
