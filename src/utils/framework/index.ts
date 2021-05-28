import {
  OsfRenderable,
  IOsfRenderable,
  OsfObservable,
  IOsfObservable,
  OsfView,
  IOsfView,
  OsfModel,
  IOsfModel,
  OsfModelView,
  IOsfModelView,
  OsfCollection,
  IOsfCollection,
  OsfCollectionView,
  IOsfCollectionView,
  OsfPresenter,
  IOsfPresenter,
  OsfApplication,
  OsfRegion,
  OsfReference,
  ALL_EVENTS,
  MODEL_CHANGED_EVENT,
  MODEL_ADDED_EVENT,
  MODEL_REMOVED_EVENT,
  COLLECTION_RESETED_EVENT,
} from 'oldskull';

import { PageableCollection } from './PageableCollection';
import { ServerModel } from './ServerModel';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export {
  // Re-exports
  OsfRenderable as Renderable,
  IOsfRenderable as IRenderable,
  OsfObservable as Observable,
  IOsfObservable as IObservable,
  OsfView as View,
  IOsfView as IView,
  OsfModel as Model,
  IOsfModel as IModel,
  OsfModelView as ModelView,
  IOsfModelView as IModelView,
  OsfCollection as Collection,
  IOsfCollection as ICollection,
  OsfCollectionView as CollectionView,
  IOsfCollectionView as ICollectionView,
  OsfPresenter as Presenter,
  IOsfPresenter as IPresenter,
  OsfApplication as Application,
  OsfRegion as Region,
  OsfReference as Reference,
  ALL_EVENTS,
  MODEL_CHANGED_EVENT,
  MODEL_ADDED_EVENT,
  MODEL_REMOVED_EVENT,
  COLLECTION_RESETED_EVENT,
  // Own
  PageableCollection,
  ServerModel,
  HttpMethod,
}
