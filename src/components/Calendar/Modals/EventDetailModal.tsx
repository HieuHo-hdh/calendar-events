import { Dictionary } from "@fullcalendar/core/internal";
import { Button, Checkbox, ColorPicker, DatePicker, Form, Input, Modal, Popconfirm, Radio, Select, Switch } from "antd"
import dayjs, { Dayjs } from "dayjs";
import { FC, useContext, useEffect, useMemo, useState } from "react"
import { DATE_DISPLAY_FORMAT } from "@/constants/dateTime.constant";
import { EVENT_TYPE, EVENT_TYPES, RECUR_EVENT_TYPES } from "@/constants/event.constant";
import { Event } from "@/model/event.model";
import { handleParseArrayToLabelValueArray } from "@/utils/array.util";
import { handleParseTimezoneToLabelValueArray } from "@/utils/timezone.util";
import EventDetailCard from "./EventDetailCard";
import { AppContext } from "@/context/appContext";
import { STORE_ACTIONS } from "@/reducer/appReducer";

const { RangePicker } = DatePicker;

type EventDetailModalProps = {
  open: boolean
  onCancel: () => void;
  clickedEvent: Event & Dictionary
}

type EditEventForm = Event & {
  duration: string
  isRecur: boolean
}

const EventDetailModal: FC<EventDetailModalProps> = ({
  open,
  onCancel,
  clickedEvent,
}) => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Context is undefined");
  const { dispatch } = appContext ?? {};

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formEditEvent] = Form.useForm()

  const type = Form.useWatch('type', formEditEvent)
  const isRecur = Form.useWatch('isRecur', formEditEvent)

  const eventInfo = useMemo(() =>{
    const formattedEvent = {
      ...clickedEvent,
      ...clickedEvent?.extendedProps,
      duration: [
        dayjs(clickedEvent?.start),
        dayjs(clickedEvent?.end),
      ],
      isRecur: clickedEvent?.extendedProps?.recurDetail?.isRecur,
      recurInterval: clickedEvent?.extendedProps?.recurDetail?.repeatFrequency,
      recurUntil: dayjs(clickedEvent?.extendedProps?.recurDetail?.repeatUntil),
    }
    return formattedEvent
  }, [clickedEvent])

  const handleEditEvent = (formValues: EditEventForm) => {
    console.log('form::', formValues)
    const [startDuration, endDuration] = formValues.duration
    const startByTimeZone = dayjs(startDuration).tz(formValues.timezone)
    const endByTimeZone = dayjs(endDuration).tz(formValues.timezone)

    console.log('startByTimeZone:', startByTimeZone, startByTimeZone.toISOString(), startByTimeZone.format())
    console.log('endByTimeZone:', endByTimeZone, endByTimeZone.toISOString(), endByTimeZone.format())

  }

  const handleDeleteEvent = () => {
    dispatch({ type: STORE_ACTIONS.DELETE_EVENT, deleteEventId: eventInfo._id });
    onCancel();
  }

  useEffect(() => {
    if (!open) {
      formEditEvent.resetFields()
      setIsEdit(false)
    }
  }, [open, formEditEvent])


  useEffect(() => {
    formEditEvent.setFieldsValue({
      ...eventInfo,
    })
  }, [eventInfo, eventInfo?.extendedProps?._id, formEditEvent])

  return (
    <Modal
      centered
      destroyOnClose
      title={
        <div className="flex flex-col gap-2 max-w-[450px]">
          <span className="capitalize">{eventInfo?.title}</span>
          <div className="flex flex-row gap-2 items-center">
            <Switch rootClassName="text-sm" checkedChildren="View" unCheckedChildren="Edit" checked={isEdit} onChange={() => setIsEdit(!isEdit)} className="w-fit text-sm" />
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={handleDeleteEvent}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger className="text-xs p-2 h-6 rounded-full">Delete</Button>
              </Popconfirm>
          </div>
        </div>
      }
      okText="Save"
      open={open}
      onCancel={onCancel}
      zIndex={100000}
      onOk={() => formEditEvent.submit()}
    >
      {
        !isEdit ? (
          <EventDetailCard event={eventInfo} />
        ) : (
          <Form
            form={formEditEvent}
            onFinish={handleEditEvent}
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
                        return dayjs(date).isBefore(dayjs());
                      }}
                      showNow={false}
                    />
                  </Form.Item>
                </>
              )
            }
          </Form>
      )}
    </Modal>
  )
}

export default EventDetailModal
