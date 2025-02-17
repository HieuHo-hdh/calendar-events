import { DATE_DISPLAY_FORMAT } from "@/constants/dateTime.constant";
import { EVENT_TYPE, EVENT_TYPES, RECUR_EVENT_TYPES } from "@/constants/event.constant";
import { TIMEZONE } from "@/constants/timezone.constant";
import { Event } from "@/model/event.model";
import { handleParseArrayToLabelValueArray } from "@/utils/array.util";
import { handleParseTimezoneToLabelValueArray } from "@/utils/timezone.util";
import { Checkbox, ColorPicker, DatePicker, Form, Input, Modal, Radio, Select } from "antd"
import dayjs, { Dayjs } from "dayjs";
import { FC, useEffect } from "react"

const { RangePicker } = DatePicker;

type CreateEventModalProps = {
  open: boolean
  onCancel: () => void;
  clickedDay: Dayjs
}

type CreateEventForm = Event & {
  duration: string
  isRecur: boolean
}

const CreateEventModal: FC<CreateEventModalProps> = ({
  open,
  onCancel,
  clickedDay,
}) => {
  const [formCreateEvent] = Form.useForm()

  const handleCreateEvent = (formValues: CreateEventForm) => {
    const [startDuration, endDuration] = formValues.duration
    const startByTimeZone = dayjs(startDuration).tz(formValues.timezone)
    const endByTimeZone = dayjs(endDuration).tz(formValues.timezone)
    
    console.log('startByTimeZone:', startByTimeZone, startByTimeZone.toISOString(), startByTimeZone.format())
    console.log('endByTimeZone:', endByTimeZone, endByTimeZone.toISOString(), endByTimeZone.format())
    console.log('form::', formValues)
  }

  useEffect(() => {
    if (!open) formCreateEvent.resetFields()
  }, [open, formCreateEvent])

  const type = Form.useWatch('type', formCreateEvent)
  const isRecur = Form.useWatch('isRecur', formCreateEvent)

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
          timezone: TIMEZONE.UTC_PLUS_7,
          backgroundColor: "#0F4C81",
          isRecur: false,
          link: "https://calendar.google.com/calendar/"
        }}
        onFinish={handleCreateEvent}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 28 }}
        
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
          name="timezone"
          label="Timezone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={handleParseTimezoneToLabelValueArray()}/>
        </Form.Item>
        <Form.Item
          name="backgroundColor"
          label="Color"
        >
          <ColorPicker />
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
        <Form.Item
          name="isRecur"
          label="Recurring"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        {
          isRecur && (
            <>
              <Form.Item
                name="recurInterval"
                label="Repeat"
              >
                <Select className="capitalize" popupClassName="capitalize" options={handleParseArrayToLabelValueArray(RECUR_EVENT_TYPES)} />
              </Form.Item>
              <Form.Item
                name="recurUntil"
                label="Until"
              >
                <DatePicker
                  className="w-full"
                  format={DATE_DISPLAY_FORMAT}
                  disabledDate={(date: Dayjs) => {
                    return dayjs(date).isBefore(dayjs());
                  }}
                  showNow={false}
                />
              </Form.Item>
            </>
          )
        }
      </Form>
    </Modal>
  )
}

export default CreateEventModal
