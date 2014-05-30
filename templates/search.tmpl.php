<?php if (!array_key_exists ('form', $content)) { ?>

<form
  id="e2-search"
  class="e2-enterable"
  action="<?= @$content['search']['form-action'] ?>"
  method="post"
  accept-charset="utf-8"
>

<div class="e2-search">

  <label class="e2-search-input">
    <input class="text" type="search" name="query" id="query"
      placeholder="<?= @$content['blog']['language'] == 'ru' ? 'Поиск заметок и тегов' : 'Search notes and tags' ?>"
      value="<?= @$content['search']['query'] ?>"
    />
  </label>

</div>

</form>

<?php } ?>
