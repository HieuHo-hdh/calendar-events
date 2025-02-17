import { DATE_DISPLAY_FORMAT } from "@/constants/dateTime.constant";
import { EVENT_TYPE, EVENT_TYPES, RECUR_EVENT_TYPES } from "@/constants/event.constant";
import { TIMEZONE } from "@/constants/timezone.constant";
import { AppContext } from "@/context/appContext";
import { mockProfile } from "@/mocks/Events.mock";
import { Event } from "@/model/event.model";
import { STORE_ACTIONS } from "@/reducer/appReducer";
import { handleParseArrayToLabelValueArray } from "@/utils/array.util";
import { handleGenerateRecurringEvents } from "@/utils/calendarEvent.util";
import { handleParseTimezoneToLabelValueArray } from "@/utils/timezone.util";
import { Checkbox, ColorPicker, DatePicker, Form, Input, Modal, Radio, Select } from "antd"
import { Color } from "antd/es/color-picker";
import dayjs, { Dayjs } from "dayjs";
import { FC, useContext, useEffect } from "react"

const { RangePicker } = DatePicker;

type CreateEventModalProps = {
  open: boolean
  onCancel: () => void;
  clickedDay: Dayjs
}

type CreateEventForm = Event & {
  duration: string
  isRecur: boolean
  recurInterval: string
  recurUntil: string
  backgroundColor: Color
}

const CreateEventModal: FC<CreateEventModalProps> = ({
  open,
  onCancel,
  clickedDay,
}) => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Context is undefined");
  const { dispatch } = appContext ?? {};

  const [formCreateEvent] = Form.useForm()

  const handleColorChange = (color: Color) => {
    formCreateEvent.setFieldValue('backgroundColor', color.toHexString());
  };

  const handleCreateEvent = (formValues: CreateEventForm) => {
    const [startDuration, endDuration] = formValues.duration
    const startByTimeZone = dayjs(startDuration).tz(formValues.timezone)
    const endByTimeZone = dayjs(endDuration).tz(formValues.timezone)
    const newEventId = Math.random().toString();

    let submitFormFields: Event = {
      _id: newEventId,
      title: formValues.title,
      type: formValues.type,
      backgroundColor: formValues.backgroundColor,
      timezone: formValues.timezone,
      start: startByTimeZone.toISOString(),
      end: endByTimeZone.toISOString(),
      link: formValues.link,
      profile: mockProfile,
    }

    if (formValues.isRecur) {
      submitFormFields = { 
        ...submitFormFields,
        recurDetail: {
          isRecur: true,
          parentEventId: newEventId,
          repeatFrequency: formValues.recurInterval,
          repeatUntil: dayjs(recurUntil).toISOString(),
        }
      }

      // TODO: Loop to add new event here
      const recurringEvents = handleGenerateRecurringEvents(submitFormFields)
      dispatch({ type: STORE_ACTIONS.CREATE_EVENTS, newEvents: recurringEvents });
    }
    else dispatch({ type: STORE_ACTIONS.CREATE_EVENT, newEvent: submitFormFields });
    console.log('submitFormFields:', submitFormFields)
    onCancel()
  }

  const type = Form.useWatch('type', formCreateEvent)
  const isRecur = Form.useWatch('isRecur', formCreateEvent)
  const startDate = Form.useWatch('duration', formCreateEvent)?.[0]
  const recurUntil = Form.useWatch('recurUntil', formCreateEvent)

  useEffect(() => {
    if (!open) formCreateEvent.resetFields()
  }, [open, formCreateEvent])

  useEffect(() => {
    if (dayjs(recurUntil).isBefore(startDate)) {
      formCreateEvent.setFieldsValue({
        recurUntil: dayjs(startDate).add(1, 'day'),
      })
    }
  }, [startDate, recurUntil, formCreateEvent])

  return (
    <Modal
      centered
      title={<span className="capitalize">Create {type}</span>}
      okText="Save"
      afterOpenChange={() => formCreateEvent.setFieldsValue({
        duration: [dayjs(clickedDay).startOf('d'), dayjs(clickedDay).endOf('d')],
      })}
      open={open}
      onCancel={onCancel}
      onOk={() => formCreateEvent.submit()}
    >
      <Form
        form={formCreateEvent}
        initialValues={{
          type: EVENT_TYPE.APPOINTMENT,
          timezone: TIMEZONE.UTC_PLUS_7,
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
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ColorPicker format="hex" onChange={handleColorChange}  />
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
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select className="capitalize" popupClassName="capitalize" options={handleParseArrayToLabelValueArray(RECUR_EVENT_TYPES)} />
              </Form.Item>
              <Form.Item
                name="recurUntil"
                label="Until"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  format={DATE_DISPLAY_FORMAT}
                  disabledDate={(date: Dayjs) => {
                    if (startDate) {
                      return dayjs(date).isBefore(dayjs(startDate));
                    }
                    return false;
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
