import TabContent from './TabContent';

const TabsContent = () => {
  return (
    <div className="tab-content" id="pills-tabContent">
      <TabContent id="faq1" isActive />
      <TabContent id="faq2" />
    </div>
  )
}

export default TabsContent