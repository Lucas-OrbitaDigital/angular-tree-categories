<?php
require_once __DIR__ . '/LastError.php';
class Tree
{
    use LastError;
    private $data = [];

    public function __construct()
    {
        $this->init();
    }

    private function init(): void
    {
        try {
            $db = Db::getInstance();
            $sql = "SELECT c.id_category as id, c.id_parent, cl.name FROM " . _DB_PREFIX_ . "category c JOIN " . _DB_PREFIX_ . "category_lang cl ON c.id_category = cl.id_category WHERE cl.id_lang = 3";
            
            $result = $db->executeS($sql);
            $this->data = is_array($result) ? $result : [];
            // throw new Exception("bla");
        } catch (Exception $e) {
            $this->setLastError($e->getMessage());
            $this->data = [];
        }
    }

    /**
     * Recursively builds the category tree.
     * @param array $elements
     * @param int $parentId
     * 
     * @return array
     */
    private function buildTree(array $elements, int $parentId = 0): array
    {
        $branch = [];
        foreach ($elements as $element) {
            if ($element['id_parent'] == $parentId) {
                $children = $this->buildTree($elements, $element['id']);
                if ($children) {
                    $element['children'] = $children;
                }
                $branch[] = $element;
            }
        }
        return $branch;
    }

    /**
     * Formats flat data into a recursive tree structure.
     * @param int $parentId
     * 
     * @return array
     */
    public function getTree(int $parentId = 1): array
    {
        if (empty($this->data)) {
            return [];
        }
        return $this->buildTree($this->data, $parentId);
    }
}
